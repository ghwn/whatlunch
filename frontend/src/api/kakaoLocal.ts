import type { Restaurant, KakaoSearchResponse } from "../types";

const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY as
  | string
  | undefined;
const MAX_PAGES = 3;

async function fetchKakaoSearch(
  endpoint: string,
  params: Record<string, string>
): Promise<Restaurant[]> {
  const results: Restaurant[] = [];

  for (let page = 1; page <= MAX_PAGES; page++) {
    const url = new URL(
      `https://dapi.kakao.com/v2/local/search/${endpoint}.json`
    );
    Object.entries({ ...params, size: "15", page: page.toString() }).forEach(
      ([key, value]) => url.searchParams.set(key, value)
    );

    const response = await fetch(url.toString(), {
      headers: { Authorization: `KakaoAK ${KAKAO_REST_API_KEY}` },
    });

    if (!response.ok) throw new Error(`Kakao API error: ${response.status}`);

    const data: KakaoSearchResponse = await response.json();
    results.push(...data.documents);

    if (data.meta.is_end) break;
  }

  return results;
}

function searchByCategory(
  longitude: number,
  latitude: number,
  radius: number
): Promise<Restaurant[]> {
  return fetchKakaoSearch("category", {
    category_group_code: "FD6",
    x: longitude.toString(),
    y: latitude.toString(),
    radius: radius.toString(),
  });
}

function searchByKeyword(
  keyword: string,
  longitude: number,
  latitude: number,
  radius: number
): Promise<Restaurant[]> {
  return fetchKakaoSearch("keyword", {
    query: keyword,
    x: longitude.toString(),
    y: latitude.toString(),
    radius: radius.toString(),
  });
}

export async function searchRestaurants(
  longitude: number,
  latitude: number,
  radius = 500
): Promise<Restaurant[]> {
  if (!KAKAO_REST_API_KEY) {
    throw new Error("Kakao REST API key is not configured");
  }

  // 카테고리 검색 + 키워드 검색 병행
  const [categoryResults, keywordResults1, keywordResults2] = await Promise.all(
    [
      searchByCategory(longitude, latitude, radius),
      searchByKeyword("맛집", longitude, latitude, radius),
      searchByKeyword("음식점", longitude, latitude, radius),
    ]
  );

  // 중복 제거 (id 기준)
  const seen = new Set<string>();
  const allResults: Restaurant[] = [];

  for (const item of [
    ...categoryResults,
    ...keywordResults1,
    ...keywordResults2,
  ]) {
    if (!seen.has(item.id)) {
      seen.add(item.id);
      allResults.push(item);
    }
  }

  return allResults;
}

export function getRandomRestaurants(
  restaurants: Restaurant[],
  count: number
): Restaurant[] {
  if (restaurants.length <= count) {
    return [...restaurants];
  }

  const shuffled = [...restaurants].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getNaverBlogSearchUrl(placeName: string): string {
  const query = encodeURIComponent(placeName);
  return `https://search.naver.com/search.naver?ssc=tab.blog.all&sm=tab_jum&query=${query}`;
}
