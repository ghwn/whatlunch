import { useEffect, useRef, useCallback } from 'react';
import { useKakaoMaps } from '../hooks/useKakaoMaps';
import './MiniMap.css';

export function MiniMap({ latitude, longitude, onLocationChange, isCustomLocation, onReset }) {
  const containerRef = useRef(null);
  const mapStateRef = useRef({ map: null, marker: null });
  const { isLoaded, error } = useKakaoMaps();

  const updateLocation = useCallback((lat, lng) => {
    if (onLocationChange) {
      onLocationChange({ latitude: lat, longitude: lng });
    }
  }, [onLocationChange]);

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

    // 마커 드래그 종료 시 위치 업데이트
    window.kakao.maps.event.addListener(newMarker, 'dragend', () => {
      const pos = newMarker.getPosition();
      updateLocation(pos.getLat(), pos.getLng());
    });

    // 지도 클릭 시 마커 이동 및 위치 업데이트
    window.kakao.maps.event.addListener(newMap, 'click', (mouseEvent) => {
      const pos = mouseEvent.latLng;
      newMarker.setPosition(pos);
      updateLocation(pos.getLat(), pos.getLng());
    });

    mapStateRef.current = { map: newMap, marker: newMarker };
  }, [isLoaded, latitude, longitude, updateLocation]);

  if (error) {
    return (
      <div className="mini-map-container">
        <div className="mini-map mini-map-error">
          <p>지도를 불러올 수 없습니다</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="mini-map-container">
        <div className="mini-map mini-map-loading">
          <p>지도 로딩중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mini-map-container">
      <div ref={containerRef} className="mini-map"></div>
      <div className={`location-badge ${isCustomLocation ? 'location-badge-custom' : ''}`}>
        {isCustomLocation ? '선택한 위치' : '현재 위치'}
      </div>
      {isCustomLocation && onReset && (
        <button className="reset-location-btn" onClick={onReset} type="button">
          현재 위치로
        </button>
      )}
    </div>
  );
}
