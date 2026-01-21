import './Loading.css';

const FOOD_CARDS = [
  { emoji: '🍛', bg: '#FFF4CC' },
  { emoji: '🍔', bg: '#FFE5E5' },
  { emoji: '🍜', bg: '#E5F4FF' },
  { emoji: '🍕', bg: '#FFE5F4' },
  { emoji: '🥓', bg: '#FFF0E5' },
  { emoji: '🍣', bg: '#E5FFE5' },
];

const FLYER_COUNT = FOOD_CARDS.length;

function Flyer({ index }) {
  const food = FOOD_CARDS[index];

  return (
    <div
      className="flyer"
      style={{
        '--delay': `${index * 0.3}s`,
        '--duration': `${1.5 + Math.random() * 0.5}s`,
        '--start-x': `${(Math.random() - 0.5) * 200}px`,
        backgroundColor: food.bg,
      }}
    >
      <span className="flyer-emoji">{food.emoji}</span>
    </div>
  );
}

export function Loading() {
  return (
    <div className="loading">
      <div className="flyer-container">
        {Array.from({ length: FLYER_COUNT }, (_, i) => (
          <Flyer key={i} index={i} />
        ))}
      </div>
      <p className="loading-status">근처 식당 찾는 중...</p>
    </div>
  );
}
