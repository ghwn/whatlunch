import { useState, useCallback } from 'react';
import { useGeolocation } from './hooks/useGeolocation';
import { useLocalStorage } from './hooks/useLocalStorage';
import { searchRestaurants, getRandomRestaurants } from './api/kakaoLocal';
import { Dashboard, Results, Loading, Privacy } from './components';

const MIN_LOADING_TIME = 2500;

function App() {
  const { location: currentLocation, error: locationError, loading: locationLoading } = useGeolocation();
  const [radius, setRadius] = useLocalStorage('whatlunch_radius', 500);
  const [count, setCount] = useLocalStorage('whatlunch_count', 3);

  const [view, setView] = useState('dashboard');
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const location = selectedLocation || currentLocation;
  const isCustomLocation = selectedLocation !== null;

  const handleLocationChange = useCallback((newLocation) => {
    setSelectedLocation(newLocation);
  }, []);

  const handleResetLocation = useCallback(() => {
    setSelectedLocation(null);
  }, []);

  const handleRecommend = useCallback(async () => {
    if (!location) return;

    setView('loading');
    setError(null);

    try {
      const [allRestaurants] = await Promise.all([
        searchRestaurants(location.longitude, location.latitude, radius),
        new Promise(resolve => setTimeout(resolve, MIN_LOADING_TIME))
      ]);

      if (allRestaurants.length === 0) {
        setError('주변에 음식점이 없습니다. 거리를 늘려보세요.');
        setView('dashboard');
        return;
      }

      setRestaurants(getRandomRestaurants(allRestaurants, count));
      setView('results');
    } catch (err) {
      console.error('Failed to fetch restaurants:', err);
      setError('음식점을 불러오는데 실패했습니다. 다시 시도해주세요.');
      setView('dashboard');
    }
  }, [location, radius, count]);

  const handleBack = () => setView('dashboard');

  if (locationLoading || locationError) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex flex-col items-center p-4 sm:p-6">
        <header className="w-full max-w-4xl flex justify-center items-center py-3 sm:py-6 mb-2 sm:mb-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg">
              <i className="fas fa-utensils"></i>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">WhatLunch</h1>
          </div>
        </header>
        <main className="w-full max-w-4xl flex-1 flex flex-col items-center justify-center">
          {locationLoading ? (
            <div className="text-center space-y-6">
              <Loading />
              <p className="text-gray-500 font-medium">위치를 확인하는 중...</p>
            </div>
          ) : (
            <div className="card-animate bg-white rounded-3xl p-8 shadow-lg border border-gray-100 text-center max-w-md">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-location-crosshairs text-red-500 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">위치 권한 필요</h3>
              <p className="text-gray-500 mb-4">{locationError}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all"
              >
                다시 시도
              </button>
            </div>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center p-4 sm:p-6">
      {/* Header */}
      <header className="w-full max-w-4xl flex justify-between items-center py-3 sm:py-6 mb-2 sm:mb-6">
        <div className="flex items-center gap-2 cursor-pointer" onClick={handleBack}>
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg">
            <i className="fas fa-utensils"></i>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">WhatLunch</h1>
        </div>
        {view === 'results' && (
          <button
            onClick={handleBack}
            className="text-gray-400 hover:text-gray-900 transition-colors text-sm font-bold flex items-center gap-2"
          >
            <i className="fas fa-home"></i>
            <span className="hidden sm:inline">홈으로</span>
          </button>
        )}
      </header>

      {/* Error Banner */}
      {error && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-red-50 border border-red-100 p-4 rounded-2xl flex items-start gap-3 shadow-lg z-50 card-animate">
          <i className="fas fa-exclamation-circle text-red-500 mt-1"></i>
          <div className="flex-1">
            <p className="text-sm font-bold text-red-700">{error}</p>
            <button
              onClick={() => setError(null)}
              className="text-xs font-bold text-red-600 underline mt-1"
            >
              닫기
            </button>
          </div>
        </div>
      )}

      <main className="w-full max-w-4xl flex-1 flex flex-col items-center justify-center">
        {view === 'dashboard' && (
          <Dashboard
            location={location}
            radius={radius}
            count={count}
            onRadiusChange={setRadius}
            onCountChange={setCount}
            onRecommend={handleRecommend}
            onLocationChange={handleLocationChange}
            isCustomLocation={isCustomLocation}
            onResetLocation={handleResetLocation}
          />
        )}

        {view === 'loading' && <Loading />}

        {view === 'results' && (
          <Results
            restaurants={restaurants}
            onRetry={handleRecommend}
            onBack={handleBack}
          />
        )}

        {view === 'privacy' && (
          <Privacy onBack={handleBack} />
        )}
      </main>

      {/* Footer - Privacy Link */}
      <footer className="w-full max-w-4xl py-4 text-center">
        <button
          onClick={() => setView('privacy')}
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          개인정보 처리방침
        </button>
      </footer>
    </div>
  );
}

export default App;
