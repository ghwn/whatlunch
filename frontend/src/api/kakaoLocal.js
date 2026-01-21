const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;

export async function searchRestaurants(longitude, latitude, radius = 500) {
  if (!KAKAO_REST_API_KEY) {
    throw new Error('Kakao REST API key is not configured');
  }

  const url = new URL('https://dapi.kakao.com/v2/local/search/category.json');
  url.searchParams.set('category_group_code', 'FD6'); // Restaurant category
  url.searchParams.set('x', longitude.toString());
  url.searchParams.set('y', latitude.toString());
  url.searchParams.set('radius', radius.toString());
  url.searchParams.set('size', '15'); // Max results per page
  url.searchParams.set('sort', 'distance');

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Kakao API error: ${response.status}`);
  }

  const data = await response.json();
  return data.documents;
}

export function getRandomRestaurants(restaurants, count) {
  if (restaurants.length <= count) {
    return [...restaurants];
  }

  const shuffled = [...restaurants].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getNaverBlogSearchUrl(placeName) {
  const query = encodeURIComponent(placeName);
  return `https://search.naver.com/search.naver?ssc=tab.blog.all&sm=tab_jum&query=${query}`;
}
