import httpx
from pydantic import BaseModel

from config import settings


class KakaoSearchLocalResponse(BaseModel):
    class Document(BaseModel):
        address_name: str
        category_group_code: str
        category_group_name: str
        category_name: str
        distance: str
        id: str
        phone: str
        place_name: str
        place_url: str
        road_address_name: str
        x: str
        y: str

    class Meta(BaseModel):
        is_end: bool
        pageable_count: int
        same_name: dict | None
        total_count: int

    documents: list[Document]
    meta: Meta


def find_eateries(
    latitude: str,
    longitude: str,
    distance_meters: int = 500,
    page: int = 1,
    size: int = 15,
):
    response = httpx.get(
        "https://dapi.kakao.com/v2/local/search/category.json",
        headers={
            "Authorization": f"KakaoAK {settings.kakao_rest_api_key}",
        },
        params={
            "category_group_code": "FD6",
            "x": longitude,
            "y": latitude,
            "radius": distance_meters,
            "page": page,
            "size": size,
        },
    )
    return KakaoSearchLocalResponse.model_validate(response.json())


def main():
    latitude = "37.54463645697773"
    longitude = "127.08336817216087"
    eateries = find_eateries(latitude, longitude, distance_meters=500)
    print(eateries)


if __name__ == "__main__":
    main()
