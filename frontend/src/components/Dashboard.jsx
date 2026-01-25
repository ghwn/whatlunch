import { useState } from 'react';
import { MiniMap } from './MiniMap';
import { Slider } from './Slider';

export function Dashboard({
  location,
  radius,
  count,
  onRadiusChange,
  onCountChange,
  onRecommend,
  onLocationChange,
  isCustomLocation,
  onResetLocation,
}) {
  const [showSettings, setShowSettings] = useState(false);

  const formatRadius = (value) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}km`;
    }
    return `${value}m`;
  };

  const formatCount = (value) => `${value}개`;

  return (
    <div className="text-center space-y-4 sm:space-y-8 max-w-xl w-full">
      <div className="space-y-2 sm:space-y-4">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 leading-[1.1]">
          고민은 그만, <br />
          <span className="gradient-text">바로 추천!</span>
        </h2>
        <p className="text-gray-500 text-base sm:text-lg font-medium px-4">
          현재 위치 기반으로 주변 맛집을 랜덤 추천해드려요.
        </p>
      </div>

      {/* Mini Map */}
      {location && (
        <div className="card-animate">
          <MiniMap
            latitude={location.latitude}
            longitude={location.longitude}
            onLocationChange={onLocationChange}
            isCustomLocation={isCustomLocation}
            onReset={onResetLocation}
          />
        </div>
      )}

      <div className="flex flex-col gap-4 sm:gap-6 items-center w-full">
        <button
          onClick={onRecommend}
          className="pulse-orange btn-shadow w-full sm:w-80 h-16 sm:h-20 bg-orange-500 hover:bg-orange-600 text-white rounded-[28px] sm:rounded-[32px] text-lg sm:text-xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95"
        >
          추천받기
          <i className="fas fa-arrow-right text-sm"></i>
        </button>

        <div className="w-full">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="text-gray-400 hover:text-gray-600 font-bold text-sm flex items-center gap-2 mx-auto mb-4"
          >
            <i className={`fas fa-sliders-h transition-transform ${showSettings ? 'rotate-90' : ''}`}></i>
            설정 변경
          </button>

          {showSettings && (
            <div className="card-animate w-full max-w-lg mx-auto bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-100">
              <div className="space-y-4">
                <Slider
                  label="검색 거리"
                  value={radius}
                  min={100}
                  max={1000}
                  step={100}
                  onChange={onRadiusChange}
                  formatValue={formatRadius}
                />
                <Slider
                  label="추천 개수"
                  value={count}
                  min={1}
                  max={10}
                  step={1}
                  onChange={onCountChange}
                  formatValue={formatCount}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
