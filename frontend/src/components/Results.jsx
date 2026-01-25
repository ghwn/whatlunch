import { RestaurantCard } from './RestaurantCard';

export function Results({ restaurants, onRetry, onBack }) {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 card-animate">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
          오늘의 <span className="gradient-text">추천</span>
        </h2>
        <p className="text-gray-500 font-medium">
          {restaurants.length}개의 맛집을 찾았어요!
        </p>
      </div>

      {/* Restaurant Cards */}
      <div className="space-y-4">
        {restaurants.map((restaurant, index) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            index={index}
          />
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-6">
        <button
          onClick={onRetry}
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 btn-shadow"
        >
          <i className="fas fa-redo"></i>
          다시 추천받기
        </button>
        <button
          onClick={onBack}
          className="flex-1 sm:flex-none px-6 py-4 rounded-2xl bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all font-bold flex items-center justify-center gap-2 active:scale-95"
        >
          <i className="fas fa-home"></i>
          처음으로
        </button>
      </div>
    </div>
  );
}
