import './Slider.css';

export function Slider({ label, value, min, max, step, onChange, formatValue }) {
  const displayValue = formatValue ? formatValue(value) : value;
  const fillPercent = ((value - min) / (max - min)) * 100;

  return (
    <div className="slider-container">
      <div className="slider-header">
        <span className="slider-label">{label}</span>
        <span className="slider-value">{displayValue}</span>
      </div>
      <div className="slider-track">
        <div
          className="slider-fill"
          style={{ width: `${fillPercent}%` }}
        />
        <input
          type="range"
          className="slider"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
