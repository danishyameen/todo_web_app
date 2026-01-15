from pydantic_settings import BaseSettings
from typing import List
import os
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    APP_NAME: str = "Todo Web Application API"
    DEBUG: bool = False

    # Database settings
    DATABASE_URL: str = os.getenv("DATABASE_URL", "")
    DB_ECHO: bool = os.getenv("DB_ECHO", "False").lower() == "true"

    # JWT settings
    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", "your-secret-key-change-in-production")
    JWT_REFRESH_SECRET_KEY: str = os.getenv("JWT_REFRESH_SECRET_KEY", "your-refresh-secret-key-change-in-production")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
    REFRESH_TOKEN_EXPIRE_DAYS: int = int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS", "7"))

    # Better Auth settings
    BETTER_AUTH_SECRET: str = os.getenv("BETTER_AUTH_SECRET", "")
    BETTER_AUTH_URL: str = os.getenv("BETTER_AUTH_URL", "http://localhost:8000")

    class Config:
        env_file = ".env"
        # Ignore extra fields to prevent conflicts with environment variables
        extra = "ignore"


settings = Settings()


def get_allowed_origins_list() -> List[str]:
    # Get the allowed origins from environment variable directly
    origins_str = os.getenv("CORS_ALLOWED_ORIGINS", "http://localhost:3000,http://localhost:8000")
    return [origin.strip() for origin in origins_str.split(",")]