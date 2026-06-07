from aiogram import F, Router
from aiogram.types import CallbackQuery

router = Router(name="callbacks")

# Inline-button callbacks wired up in Phase 3.
# Callback data format: "status:<lead_id>:<new_status>"
# e.g. "status:a1b2c3d4-...:contacted"

@router.callback_query(F.data.startswith("status:"))
async def on_status_change(callback: CallbackQuery) -> None:
    await callback.answer("Status updates arrive in Phase 3.")
