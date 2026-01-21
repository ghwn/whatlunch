import { getNaverBlogSearchUrl } from '../api/kakaoLocal';
import './RestaurantCard.css';

const LINK_PROPS = {
  target: '_blank',
  rel: 'noopener noreferrer',
};

export function RestaurantCard({ restaurant, index }) {
  const { place_name, place_url, distance } = restaurant;

  return (
    <div className="restaurant-card">
      <div className="restaurant-info">
        <span className="restaurant-index">{index + 1}.</span>
        <span className="restaurant-name">{place_name}</span>
        <span className="restaurant-distance">{distance}m</span>
      </div>
      <div className="restaurant-actions">
        <a href={place_url} {...LINK_PROPS} className="action-button map-button">
          지도
        </a>
        <a href={getNaverBlogSearchUrl(place_name)} {...LINK_PROPS} className="action-button blog-button">
          블로그 후기
        </a>
      </div>
    </div>
  );
}
