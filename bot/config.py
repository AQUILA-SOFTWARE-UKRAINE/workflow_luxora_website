from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    telegram_bot_token: str
    manager_chat_id: int
    supabase_url: str
    supabase_service_role_key: str
    webhook_secret: str
    base_url: str  # Public app URL, e.g. https://luxora-website-02f1a17d6356.herokuapp.com
    port: int = 5000
