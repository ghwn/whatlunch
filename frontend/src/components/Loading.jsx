import './Loading.css';

const FOOD_CARDS = [
  { emoji: '🍛', bg: '#FFF4CC' },
  { emoji: '🍔', bg: '#FFE5E5' },
  { emoji: '🍜', bg: '#E5F4FF' },
  { emoji: '🍕', bg: '#FFE5F4' },
  { emoji: '🥓', bg: '#FFF0E5' },
  { emoji: '🍣', bg: '#E5FFE5' },
];

function Flyer({ index }) {
  const food = FOOD_CARDS[index % FOOD_CARDS.length];
  const delay = index * 0.3;
  const duration = 1.5 + Math.random() * 0.5;
  const startX = (Math.random() - 0.5) * 200;

  return (
    <div
      className="flyer"
      style={{
        '--delay': `${delay}s`,
        '--duration': `${duration}s`,
        '--start-x': `${startX}px`,
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
        {[...Array(6)].map((_, i) => (
          <Flyer key={i} index={i} />
        ))}
      </div>

      <p className="loading-status">근처 식당 찾는 중...</p>
    </div>
  );
}
