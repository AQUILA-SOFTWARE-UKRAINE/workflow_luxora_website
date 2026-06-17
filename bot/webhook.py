import hmac
import logging
from typing import Any

from aiohttp import web
from aiogram import Bot

from config import Settings

logger = logging.getLogger(__name__)


def _verify_secret(request: web.Request, secret: str) -> bool:
    # Supabase Database Webhook sends the secret as: Authorization: Bearer <secret>
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        return False
    token = auth[len("Bearer "):]
    return hmac.compare_digest(token.encode(), secret.encode())


def _format_lead(lead: dict[str, Any]) -> str:
    short_id = str(lead.get("id", ""))[:8]
    service = (lead.get("service") or "—").replace("_", " ").title()
    return (
        f"<b>New lead</b> #{short_id}\n\n"
        f"<b>Name:</b> {lead.get('name', '—')}\n"
        f"<b>Phone:</b> {lead.get('phone', '—')}\n"
        f"<b>Location:</b> {lead.get('city', '—')}, {lead.get('address', '—')}\n"
        f"<b>Service:</b> {service}\n"
        f"<b>Notes:</b> {lead.get('description') or '—'}"
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
    logger.info("New lead: id=%s service=%s", lead.get("id"), lead.get("service"))

    text = _format_lead(lead)

    try:
        await bot.send_message(
            chat_id=settings.manager_chat_id,
            text=text,
            parse_mode="HTML",
        )
    except Exception as exc:
        # Return 5xx so Supabase retries. The lead is already in the DB — no data loss.
        logger.error("Failed to forward lead to Telegram: %s", exc)
        return web.Response(status=502)

    return web.Response(status=200)
