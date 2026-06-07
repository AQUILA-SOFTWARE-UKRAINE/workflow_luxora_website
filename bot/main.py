import asyncio
import logging

from aiohttp import web
from aiogram import Bot, Dispatcher

from config import Settings
from handlers import router as main_router
from webhook import handle_supabase_webhook


async def main() -> None:
    settings = Settings()
    bot = Bot(token=settings.telegram_bot_token)
    dp = Dispatcher()
    dp.include_router(main_router)

    # HTTP server: Supabase Database Webhook endpoint + health check
    app = web.Application()
    app.router.add_post(
        "/webhook/supabase",
        lambda req: handle_supabase_webhook(req, bot, settings),
    )
    app.router.add_get("/health", lambda _: web.Response(text="ok"))

    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, "0.0.0.0", settings.port)
    await site.start()
    logging.info("Webhook server on :%d", settings.port)

    # Long-polling for local development.
    # Switch to webhook mode (aiogram SimpleRequestHandler) for production.
    await dp.start_polling(bot, skip_updates=True)


if __name__ == "__main__":
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    )
    asyncio.run(main())
