import { useState, useEffect } from 'react';

const KAKAO_JS_KEY = import.meta.env.VITE_KAKAO_JS_KEY;

let loadPromise = null;

function loadKakaoMapsScript() {
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    if (window.kakao && window.kakao.maps) {
      resolve(window.kakao.maps);
      return;
    }

    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_JS_KEY}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        resolve(window.kakao.maps);
      });
    };

    script.onerror = () => {
      reject(new Error('Failed to load Kakao Maps SDK'));
    };

    document.head.appendChild(script);
  });

  return loadPromise;
}

export function useKakaoMaps() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(() => {
    if (!KAKAO_JS_KEY) {
      return 'Kakao JS API key is not configured';
    }
    return null;
  });

  useEffect(() => {
    if (!KAKAO_JS_KEY) return;

    loadKakaoMapsScript()
      .then(() => setIsLoaded(true))
      .catch((err) => setError(err.message));
  }, []);

  return { isLoaded, error };
}
