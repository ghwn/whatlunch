import { useState, useEffect } from "react";

const KAKAO_JS_KEY = import.meta.env.VITE_KAKAO_JS_KEY as string | undefined;

let loadPromise: Promise<typeof kakao.maps> | null = null;

function loadKakaoMapsScript(): Promise<typeof kakao.maps> {
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    if (window.kakao?.maps) {
      resolve(window.kakao.maps);
      return;
    }

    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_JS_KEY}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        resolve(window.kakao.maps);
      });
    };

    script.onerror = () => {
      reject(new Error("Failed to load Kakao Maps SDK"));
    };

    document.head.appendChild(script);
  });

  return loadPromise;
}

interface UseKakaoMapsResult {
  isLoaded: boolean;
  error: string | null;
}

export function useKakaoMaps(): UseKakaoMapsResult {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(
    KAKAO_JS_KEY ? null : "Kakao JS API key is not configured"
  );

  useEffect(() => {
    if (!KAKAO_JS_KEY) return;

    loadKakaoMapsScript()
      .then(() => setIsLoaded(true))
      .catch((err: Error) => setError(err.message));
  }, []);

  return { isLoaded, error };
}
