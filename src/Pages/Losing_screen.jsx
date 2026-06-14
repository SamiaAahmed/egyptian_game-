import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Losing_screen.css';

const Losing_screen = ({
  playAgainPath = '/level1_6',   // where "Play Again" sends the user
  levelsPath    = '/levels',     // where "Levels" sends the user
  homePath      = '/menu',       // where "Home" sends the user
  onClose,                       // optional: called when overlay closes (e.g. to unmount it from parent)
}) => {
  const navigate  = useNavigate();
  const [closing, setClosing] = useState(false);

  // Escape closes (same as Menu_popup)
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape' && onClose) close(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const close = (cb) => {
    setClosing(true);
    setTimeout(() => {
      if (onClose) onClose();
      if (cb)      cb();
    }, 280);
  };

  const handlePlayAgain = () => close(() => navigate(playAgainPath));
  const handleLevels    = () => close(() => navigate(levelsPath));
  const handleHome      = () => close(() => navigate(homePath));

  return (
    <div className={`losing-popup${closing ? ' losing-popup--closing' : ''}`}>
      <div className="losing-popup__panel">

        <span className="losing-popup__title">You Lost</span>
        <div  className="losing-popup__divider" aria-hidden="true" />

        <button className="losing-popup__btn" onClick={handlePlayAgain}>
          Play Again
        </button>
        <button className="losing-popup__btn" onClick={handleLevels}>
          Levels
        </button>
        <button className="losing-popup__btn losing-popup__btn--home" onClick={handleHome}>
          Home
        </button>

      </div>
    </div>
  );
};

export default Losing_screen;