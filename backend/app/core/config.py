from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    class Config:
        env_file = ".env"

# Create a single instance that the rest of your app can import
settings = Settings()