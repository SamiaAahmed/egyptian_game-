import React, { useMemo } from 'react';
import './Starfield.css';

const STAR_COLORS = ['#ffffff', '#ffe9c2'];

// Generate a fixed set of randomized stars once per mount.
function makeStars(count) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: 1 + Math.random() * 1.6,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      delay: (Math.random() * 6).toFixed(2),
      duration: (2.2 + Math.random() * 3.2).toFixed(2),
    });
  }
  return stars;
}

/**
 * Drop this in as the FIRST child of `.main_level2` (before Sound_button,
 * Menu_button, etc). It sits at z-index 0, same layer as the glow/vignette
 * pseudo-elements, so the real UI on top is unaffected.
 */
const Starfield = ({ count = 70 }) => {
  const stars = useMemo(() => makeStars(count), [count]);

  return (
    <div className="lvl2_starfield" aria-hidden="true">
      {stars.map((s) => (
        <span
          key={s.id}
          className="lvl2_star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: s.color,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Starfield;