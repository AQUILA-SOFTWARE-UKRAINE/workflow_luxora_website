import hmac
import logging
from typing import Any

from aiohttp import web
from aiogram import Bot
from aiogram.types import InputMediaPhoto, URLInputFile

from config import Settings

logger = logging.getLogger(__name__)


def _verify_secret(request: web.Request, secret: str) -> bool:
    # Supabase Database Webhook sends the secret as: Authorization: Bearer <secret>
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        return False
    token = auth[len("Bearer "):]
    return hmac.compare_digest(token.encode(), secret.encode())


SERVICE_LABELS: dict[str, str] = {
    "upholstery": "Upholstery & Carpet Cleaning",
    "apartment":  "Apartment & House Cleaning",
    "windows":    "Window Cleaning",
    "driveway":   "Driveway & Patio Washing",
    "car":        "Car Interior Detailing",
    "other":      "Other",
}


def _format_lead(lead: dict[str, Any]) -> str:
    short_id = str(lead.get("id", ""))[:8]
    raw_services: list[str] = lead.get("services") or []
    services_str = ", ".join(SERVICE_LABELS.get(s, s) for s in raw_services) or "—"
    return (
        f"<b>New lead</b> #{short_id}\n\n"
        f"<b>Name:</b> {lead.get('name', '—')}\n"
        f"<b>Phone:</b> {lead.get('phone', '—')}\n"
        f"<b>Location:</b> {lead.get('city', '—')}, {lead.get('address') or '—'}\n"
        f"<b>Services:</b> {services_str}\n"
        f"<b>Notes:</b> {lead.get('message') or '—'}"
    )


async def handle_supabase_webhook(
    request: web.Request, bot: Bot, settings: Settings
) -> web.Response:
    if not _verify_secret(request, settings.webhook_secret):
        logger.warning("Supabase webhook: rejected request with invalid secret")
        return web.Response(status=401)

    try:
        body = await request.json()
    except Exception:
        return web.Response(status=400)

    if body.get("type") != "INSERT" or body.get("table") != "leads":
        return web.Response(status=200)

    lead: dict[str, Any] = body.get("record", {})
    logger.info("New lead: id=%s services=%s", lead.get("id"), lead.get("services"))

    text = _format_lead(lead)
    photo_urls: list[str] = lead.get("photos") or []

    try:
        if not photo_urls:
            await bot.send_message(
                chat_id=settings.manager_chat_id,
                text=text,
                parse_mode="HTML",
            )
        elif len(photo_urls) == 1:
            await bot.send_photo(
                chat_id=settings.manager_chat_id,
                photo=URLInputFile(photo_urls[0]),
                caption=text,
                parse_mode="HTML",
            )
        else:
            media = [
                InputMediaPhoto(
                    media=URLInputFile(photo_urls[0]),
                    caption=text,
                    parse_mode="HTML",
                ),
                *[InputMediaPhoto(media=URLInputFile(url)) for url in photo_urls[1:10]],
            ]
            await bot.send_media_group(
                chat_id=settings.manager_chat_id,
                media=media,
            )
    except Exception as exc:
        # Return 5xx so Supabase retries. The lead is already in the DB — no data loss.
        logger.error("Failed to forward lead to Telegram: %s", exc)
        return web.Response(status=502)

    return web.Response(status=200)
