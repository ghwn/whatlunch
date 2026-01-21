import { useState, useCallback } from 'react';
import { useGeolocation } from './hooks/useGeolocation';
import { useLocalStorage } from './hooks/useLocalStorage';
import { searchRestaurants, getRandomRestaurants } from './api/kakaoLocal';
import { Dashboard, Results, Loading } from './components';
import './App.css';

function App() {
  const { location, error: locationError, loading: locationLoading } = useGeolocation();
  const [radius, setRadius] = useLocalStorage('whatlunch_radius', 500);
  const [count, setCount] = useLocalStorage('whatlunch_count', 3);

  const [view, setView] = useState('dashboard'); // 'dashboard' | 'loading' | 'results'
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);

  const handleRecommend = useCallback(async () => {
    if (!location) return;

    setView('loading');
    setError(null);

    const MIN_LOADING_TIME = 2500; // 전단지 애니메이션을 위한 최소 로딩 시간

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

      const selected = getRandomRestaurants(allRestaurants, count);
      setRestaurants(selected);
      setView('results');
    } catch (err) {
      console.error('Failed to fetch restaurants:', err);
      setError('음식점을 불러오는데 실패했습니다. 다시 시도해주세요.');
      setView('dashboard');
    }
  }, [location, radius, count]);

  const handleBack = () => {
    setView('dashboard');
  };

  if (locationLoading) {
    return (
      <div className="app">
        <div className="app-container">
          <h1 className="app-title">WhatLunch</h1>
          <Loading />
          <p className="status-text">위치를 확인하는 중...</p>
        </div>
      </div>
    );
  }

  if (locationError) {
    return (
      <div className="app">
        <div className="app-container">
          <h1 className="app-title">WhatLunch</h1>
          <div className="error-container">
            <p className="error-text">{locationError}</p>
            <p className="error-hint">위치 권한을 허용해주세요.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="app-container">
        {view !== 'results' && <h1 className="app-title">WhatLunch</h1>}

        {error && (
          <div className="error-banner">
            {error}
          </div>
        )}

        {view === 'dashboard' && (
          <Dashboard
            location={location}
            radius={radius}
            count={count}
            onRadiusChange={setRadius}
            onCountChange={setCount}
            onRecommend={handleRecommend}
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
      </div>
    </div>
  );
}

export default App;
