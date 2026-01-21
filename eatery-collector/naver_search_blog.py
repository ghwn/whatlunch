import httpx
from pydantic import BaseModel

from settings import settings


class NaverSearchBlogResponse(BaseModel):
    class Item(BaseModel):
        title: str  # 깃한 족발과 야들야들한 보쌈이 있는 <b>구의</b>동술집 미림
        link: str  # https://blog.naver.com/rammiya/224155014841
        description: str  # '#<b>구의역맛집</b> #구의동맛집 #구의역술집 #구의역밥집 #구의동술집 <b>구의역맛집</b>이 계속해서 생기고 사라지는 동안에도 그 자리를 꿋꿋히 지키고 있는 족발집이 있어요. 그만큼 많은 사람들에게 사랑받고 있는거죠ㅎ...'
        bloggername: str  # 궁금증부자 람미
        bloggerlink: str  # blog.naver.com/rammiya
        postdate: str  # 20260121

    lastBuildDate: str  # Wed, 21 Jan 2026 21:44:54 +0900
    total: int  # 104200
    start: int  # 1
    display: int  # 100
    items: list[Item]


def find_eateries(
    query: str,
    page: int = 1,
    size: int = 100,
) -> NaverSearchBlogResponse:
    response = httpx.get(
        "https://openapi.naver.com/v1/search/blog.json",
        headers={
            "X-Naver-Client-Id": settings.naver_client_id,
            "X-Naver-Client-Secret": settings.naver_client_secret,
        },
        params={
            "query": query,
            "display": size,
            "start": (page - 1) * size + 1,
            "sort": "date",
        },
    )
    return NaverSearchBlogResponse.model_validate(response.json())


def main():
    eateries = find_eateries("서북면옥", page=1)
    print(eateries)


if __name__ == "__main__":
    main()
