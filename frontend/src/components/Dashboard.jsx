import { MiniMap } from './MiniMap';
import { Slider } from './Slider';
import './Dashboard.css';

export function Dashboard({
  location,
  radius,
  count,
  onRadiusChange,
  onCountChange,
  onRecommend,
}) {
  const formatRadius = (value) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}km`;
    }
    return `${value}m`;
  };

  const formatCount = (value) => `${value}개`;

  return (
    <div className="dashboard">
      {location && (
        <MiniMap latitude={location.latitude} longitude={location.longitude} />
      )}

      <div className="settings">
        <Slider
          label="거리"
          value={radius}
          min={100}
          max={1000}
          step={100}
          onChange={onRadiusChange}
          formatValue={formatRadius}
        />
        <Slider
          label="개수"
          value={count}
          min={1}
          max={10}
          step={1}
          onChange={onCountChange}
          formatValue={formatCount}
        />
      </div>

      <button className="recommend-button" onClick={onRecommend}>
        추천받기
      </button>
    </div>
  );
}
