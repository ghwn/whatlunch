import { useEffect, useRef, useCallback } from "react";
import { useKakaoMaps } from "../hooks/useKakaoMaps";
import type { Location } from "../types";

interface MiniMapProps {
  latitude: number;
  longitude: number;
  onLocationChange?: (location: Location) => void;
  isCustomLocation: boolean;
  onReset?: () => void;
}

interface MapState {
  map: kakao.maps.Map | null;
  marker: kakao.maps.Marker | null;
}

export function MiniMap({
  latitude,
  longitude,
  onLocationChange,
  isCustomLocation,
  onReset,
}: MiniMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapStateRef = useRef<MapState>({ map: null, marker: null });
  const { isLoaded, error } = useKakaoMaps();

  const updateLocation = useCallback(
    (lat: number, lng: number) => {
      if (onLocationChange) {
        onLocationChange({ latitude: lat, longitude: lng });
      }
    },
    [onLocationChange]
  );

  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    const { map, marker } = mapStateRef.current;
    const position = new window.kakao.maps.LatLng(latitude, longitude);

    if (map && marker) {
      map.setCenter(position);
      marker.setPosition(position);
      return;
    }

    const newMap = new window.kakao.maps.Map(containerRef.current, {
      center: position,
      level: 4,
    });

    const newMarker = new window.kakao.maps.Marker({
      position,
      map: newMap,
      draggable: true,
    });

    window.kakao.maps.event.addListener(newMarker, "dragend", () => {
      const pos = newMarker.getPosition();
      updateLocation(pos.getLat(), pos.getLng());
    });

    window.kakao.maps.event.addListener(
      newMap,
      "click",
      (mouseEvent: { latLng: kakao.maps.LatLng }) => {
        const pos = mouseEvent.latLng;
        newMarker.setPosition(pos);
        updateLocation(pos.getLat(), pos.getLng());
      }
    );

    mapStateRef.current = { map: newMap, marker: newMarker };
  }, [isLoaded, latitude, longitude, updateLocation]);

  if (error || !isLoaded) {
    return (
      <div className="relative w-full rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm">
        <div className="w-full aspect-[3/2] flex flex-col items-center justify-center gap-2 bg-gray-50">
          {error ? (
            <>
              <i className="fas fa-map-marked-alt text-3xl text-red-400"></i>
              <p className="text-sm text-red-500 font-medium">
                지도를 불러올 수 없습니다
              </p>
            </>
          ) : (
            <>
              <i className="fas fa-location-dot text-3xl text-orange-400 animate-bounce"></i>
              <p className="text-sm text-gray-500 font-medium">지도 로딩중...</p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm">
      <div ref={containerRef} className="w-full aspect-[3/2]"></div>

      {/* Location Badge */}
      <div
        className={`absolute bottom-3 left-3 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm z-10 ${
          isCustomLocation
            ? "bg-orange-500 text-white"
            : "bg-white text-gray-700 border border-gray-200"
        }`}
      >
        <i
          className={`fas fa-location-dot mr-1 ${
            isCustomLocation ? "text-white" : "text-orange-500"
          }`}
        ></i>
        {isCustomLocation ? "선택한 위치" : "현재 위치"}
      </div>

      {/* Reset Button */}
      {isCustomLocation && onReset && (
        <button
          onClick={onReset}
          type="button"
          className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-orange-500 border border-orange-200 hover:bg-orange-50 transition-all shadow-sm z-10"
        >
          <i className="fas fa-crosshairs mr-1"></i>
          현재 위치로
        </button>
      )}

      {/* Hint Text */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium rounded-full z-10">
        지도를 클릭하여 위치 변경
      </div>
    </div>
  );
}
