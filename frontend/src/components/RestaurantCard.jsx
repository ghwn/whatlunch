import { getNaverBlogSearchUrl } from '../api/kakaoLocal';
import './RestaurantCard.css';

export function RestaurantCard({ restaurant, index }) {
  const blogUrl = getNaverBlogSearchUrl(restaurant.place_name);

  return (
    <div className="restaurant-card">
      <div className="restaurant-info">
        <span className="restaurant-index">{index + 1}.</span>
        <span className="restaurant-name">{restaurant.place_name}</span>
        <span className="restaurant-distance">{restaurant.distance}m</span>
      </div>
      <div className="restaurant-actions">
        <a
          href={restaurant.place_url}
          target="_blank"
          rel="noopener noreferrer"
          className="action-button map-button"
        >
          지도
        </a>
        <a
          href={blogUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="action-button blog-button"
        >
          블로그 후기
        </a>
      </div>
    </div>
  );
}
