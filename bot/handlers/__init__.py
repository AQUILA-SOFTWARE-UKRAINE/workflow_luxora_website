from aiogram import Router

from handlers.callbacks import router as callbacks_router

router = Router(name="main")
router.include_router(callbacks_router)
