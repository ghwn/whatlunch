import httpx
from pydantic import BaseModel

from settings import settings


class NaverSearchLocalResponse(BaseModel):
    class Item(BaseModel):
        title: str  # 구의농원
        link: str  # https://www.instagram.com/guuinongwon?igshid=M2RkZGJiMzhjOQ==
        category: str  # 한식>육류,고기요리
        description: str  # ''
        telephone: str  # ''
        address: str  # 서울특별시 광진구 구의동 219-31 1층, 2층
        roadAddress: str  # 서울특별시 광진구 아차산로 453-1 1층, 2층
        mapx: int  # 1270924982
        mapy: int  # 375395252

    lastBuildDate: str  # Wed, 21 Jan 2026 21:37:01 +0900
    total: int  # 5
    start: int  # 1
    display: int  # 5
    items: list[Item]


def find_eateries(query: str):
    response = httpx.get(
        "https://openapi.naver.com/v1/search/local.json",
        headers={
            "X-Naver-Client-Id": settings.naver_client_id,
            "X-Naver-Client-Secret": settings.naver_client_secret,
        },
        params={
            "query": query,
            "display": 5,
            "start": 1,
            "sort": "random",
        },
    )
    return NaverSearchLocalResponse.model_validate(response.json())


def main():
    eateries = find_eateries("구의농원")
    print(eateries)


if __name__ == "__main__":
    main()
