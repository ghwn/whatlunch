from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env")

    naver_client_id: str
    naver_client_secret: str

    kakao_rest_api_key: str


settings = Settings()  # type: ignore
