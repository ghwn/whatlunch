// 위치 정보
export interface Location {
  latitude: number;
  longitude: number;
}

// 카카오 API 음식점 응답
export interface Restaurant {
  id: string;
  place_name: string;
  category_name: string;
  phone: string;
  address_name: string;
  road_address_name: string;
  x: string; // longitude
  y: string; // latitude
  place_url: string;
  distance: string;
}

// 앱 뷰 상태
export type ViewState = "dashboard" | "loading" | "results" | "privacy";

// Geolocation 훅 반환값
export interface GeolocationState {
  location: Location | null;
  error: string | null;
  loading: boolean;
  refresh: () => void;
}

// 카카오 API 메타 정보
export interface KakaoSearchMeta {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
}

// 카카오 API 검색 응답
export interface KakaoSearchResponse {
  documents: Restaurant[];
  meta: KakaoSearchMeta;
}
