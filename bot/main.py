import asyncio
import logging

from aiohttp import web
from aiogram import Bot, Dispatcher
from aiogram.webhook.aiohttp_server import SimpleRequestHandler, setup_application

from config import Settings
from handlers import router as main_router
from webhook import handle_supabase_webhook

TELEGRAM_WEBHOOK_PATH = "/webhook/telegram"


async def main() -> None:
    settings = Settings()
    bot = Bot(token=settings.telegram_bot_token)
    dp = Dispatcher()
    dp.include_router(main_router)

    # Register the Telegram webhook URL so Telegram knows where to push updates.
    webhook_url = f"{settings.base_url.rstrip('/')}{TELEGRAM_WEBHOOK_PATH}"
    await bot.set_webhook(url=webhook_url)
    logging.info("Telegram webhook set: %s", webhook_url)

    # Build the aiohttp application.
    app = web.Application()

    # Telegram updates arrive here via webhook.
    SimpleRequestHandler(dispatcher=dp, bot=bot).register(app, path=TELEGRAM_WEBHOOK_PATH)
    # Registers dispatcher lifecycle hooks (startup / shutdown) on the app.
    setup_application(app, dp, bot=bot)

    # Supabase Database Webhook: fires on INSERT into leads table.
    app.router.add_post(
        "/webhook/supabase",
        lambda req: handle_supabase_webhook(req, bot, settings),
    )
    app.router.add_get("/health", lambda _: web.Response(text="ok"))

    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, "0.0.0.0", settings.port)
    await site.start()
    logging.info("Bot server listening on port %d", settings.port)

    # Block forever — Nginx keeps the container alive, not this coroutine.
    await asyncio.Event().wait()


if __name__ == "__main__":
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    )
    asyncio.run(main())
