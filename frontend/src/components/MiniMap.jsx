import { useEffect, useRef } from 'react';
import { useKakaoMaps } from '../hooks/useKakaoMaps';
import './MiniMap.css';

export function MiniMap({ latitude, longitude }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const { isLoaded, error } = useKakaoMaps();

  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    const container = mapRef.current;
    const options = {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: 4,
    };

    mapInstanceRef.current = new window.kakao.maps.Map(container, options);

    markerRef.current = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(latitude, longitude),
      map: mapInstanceRef.current,
    });
  }, [isLoaded]);

  useEffect(() => {
    if (mapInstanceRef.current && markerRef.current) {
      const newPosition = new window.kakao.maps.LatLng(latitude, longitude);
      mapInstanceRef.current.setCenter(newPosition);
      markerRef.current.setPosition(newPosition);
    }
  }, [latitude, longitude]);

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
      <div ref={mapRef} className="mini-map"></div>
      <div className="location-badge">현재 위치</div>
    </div>
  );
}
