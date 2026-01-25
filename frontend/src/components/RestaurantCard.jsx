import { getNaverBlogSearchUrl } from '../api/kakaoLocal';

const LINK_PROPS = {
  target: '_blank',
  rel: 'noopener noreferrer',
};

export function RestaurantCard({ restaurant, index }) {
  const { place_name, place_url, distance, category_name, road_address_name, address_name } = restaurant;

  // Extract cuisine type from category
  const cuisine = category_name?.split(' > ').pop() || '음식점';
  const address = road_address_name || address_name || '';

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
      {/* Card Header */}
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-orange-500 text-white text-[10px] uppercase font-extrabold px-2 py-0.5 rounded">
                {cuisine}
              </span>
              <span className="text-xs font-bold text-gray-400">
                {distance}m
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 truncate mb-1">
              {index + 1}. {place_name}
            </h3>
            {address && (
              <p className="text-sm text-gray-500 flex items-center gap-1 truncate">
                <i className="fas fa-location-dot text-orange-500 text-xs"></i>
                {address}
              </p>
            )}
          </div>
          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center text-white text-2xl">
            🍽️
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="px-5 pb-5 sm:px-6 sm:pb-6 flex gap-3">
        <a
          href={place_url}
          {...LINK_PROPS}
          className="flex-1 bg-gray-900 text-white px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-95 text-sm"
        >
          <i className="fas fa-map-location-dot"></i>
          지도 보기
        </a>
        <a
          href={getNaverBlogSearchUrl(place_name)}
          {...LINK_PROPS}
          className="flex-1 px-4 py-3 rounded-xl bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all font-bold flex items-center justify-center gap-2 active:scale-95 text-sm"
        >
          <i className="fas fa-blog"></i>
          블로그 후기
        </a>
      </div>
    </div>
  );
}
