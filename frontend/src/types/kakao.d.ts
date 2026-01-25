// Kakao Maps SDK 타입 선언
declare namespace kakao.maps {
  class LatLng {
    constructor(latitude: number, longitude: number);
    getLat(): number;
    getLng(): number;
  }

  class Map {
    constructor(container: HTMLElement, options: MapOptions);
    setCenter(latlng: LatLng): void;
    getCenter(): LatLng;
    setLevel(level: number): void;
    getLevel(): number;
    setDraggable(draggable: boolean): void;
  }

  interface MapOptions {
    center: LatLng;
    level: number;
  }

  class Marker {
    constructor(options: MarkerOptions);
    setMap(map: Map | null): void;
    setPosition(position: LatLng): void;
    setDraggable(draggable: boolean): void;
    getPosition(): LatLng;
  }

  interface MarkerOptions {
    position: LatLng;
    map?: Map;
    draggable?: boolean;
  }

  interface MouseEvent {
    latLng: LatLng;
  }

  namespace event {
    function addListener(
      target: Marker | Map,
      type: string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handler: (event?: any) => void
    ): void;
  }

  function load(callback: () => void): void;
}

interface Window {
  kakao: typeof kakao;
}
