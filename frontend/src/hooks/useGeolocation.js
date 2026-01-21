import { useState, useEffect, useCallback } from 'react';

const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 60000,
};

const ERROR_MESSAGES = {
  1: 'Location permission denied',
  2: 'Location information unavailable',
  3: 'Location request timed out',
};

export function useGeolocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        setError(ERROR_MESSAGES[err.code] || 'An unknown error occurred');
        setLoading(false);
      },
      GEOLOCATION_OPTIONS
    );
  }, []);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  return { location, error, loading, refresh: fetchLocation };
}
