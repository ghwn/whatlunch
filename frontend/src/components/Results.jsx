import { RestaurantCard } from './RestaurantCard';
import './Results.css';

export function Results({ restaurants, onRetry, onBack }) {
  return (
    <div className="results">
      <div className="results-header">
        <button className="back-button" onClick={onBack}>
          돌아가기
        </button>
        <h2 className="results-title">오늘의 추천</h2>
      </div>

      <div className="results-list">
        {restaurants.map((restaurant, index) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            index={index}
          />
        ))}
      </div>

      <button className="retry-button" onClick={onRetry}>
        다시 추천받기
      </button>
    </div>
  );
}
