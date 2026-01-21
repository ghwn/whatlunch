import { useEffect, useRef } from 'react';
import { useKakaoMaps } from '../hooks/useKakaoMaps';
import './MiniMap.css';

export function MiniMap({ latitude, longitude }) {
  const containerRef = useRef(null);
  const mapStateRef = useRef({ map: null, marker: null });
  const { isLoaded, error } = useKakaoMaps();

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
    });

    mapStateRef.current = { map: newMap, marker: newMarker };
  }, [isLoaded, latitude, longitude]);

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
      <div className="location-badge">현재 위치</div>
    </div>
  );
}
