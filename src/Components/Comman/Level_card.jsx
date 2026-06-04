import React, { useState } from 'react';
import './Level_card.css';

const Level_card = ({
  image,
  levelNumber = 1,
  title = 'Untitled Level',
  description = '',
  locked = false,
  onClick,
  style,
}) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    if (locked) return;
    setActive(true);
    setTimeout(() => {
      setActive(false);
      if (onClick) onClick();
    }, 500);
  };

  return (
    <div
      className={[
        'level-card',
        locked ? 'level-card--locked' : '',
        active ? 'level-card--active' : '',
      ].join(' ')}
      style={style}
      onClick={handleClick}
      role="button"
      tabIndex={locked ? -1 : 0}
      aria-label={`${title}${locked ? ' — locked' : ''}`}
      onKeyDown={e => e.key === 'Enter' && handleClick()}
    >
      {/* Sweep shimmer */}
      <span className="level-card__sweep" aria-hidden="true" />

      {/* Image */}
      <div className="level-card__image-wrap">
        {image ? (
          <img className="level-card__image" src={image} alt={title} />
        ) : (
          <div
            className="level-card__image"
            style={{
              background: 'linear-gradient(135deg, #0a1e22 0%, #1F5157 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              color: 'rgba(234,191,114,0.25)',
            }}
          >
            𓂀
          </div>
        )}
        <div className="level-card__image-overlay" aria-hidden="true" />
        <span className="level-card__badge">Level {levelNumber}</span>
        {locked && <div className="level-card__lock" aria-hidden="true">🔒</div>}
      </div>

      {/* Divider */}
      <div className="level-card__divider" aria-hidden="true" />

      {/* Body */}
      <div className="level-card__body">
        <h3 className="level-card__title">{title}</h3>
        {description && <p className="level-card__desc">{description}</p>}
        <div className="level-card__footer">
          {!locked && <span className="level-card__cta">Dive →</span>}
        </div>
      </div>
    </div>
  );
};

export default Level_card;