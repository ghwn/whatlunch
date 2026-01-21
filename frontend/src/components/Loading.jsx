import { useState, useEffect } from 'react';
import { getRandomTip } from '../data/tips';
import './Loading.css';

export function Loading() {
  const [tip, setTip] = useState(getRandomTip);

  useEffect(() => {
    const interval = setInterval(() => {
      setTip(getRandomTip());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading">
      <div className="loading-spinner"></div>
      <p className="loading-tip">{tip}</p>
    </div>
  );
}
