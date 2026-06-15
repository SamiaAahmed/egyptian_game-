import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Losing_screen.css';
import LoseSvg from '../Assets/Images/lose_svg.svg';

const Losing_screen = ({
  playAgainPath = '/level1_6',
  levelsPath    = '/levels',
  homePath      = '/menu',
  onClose,
  onPlayAgain,
}) => {
  const navigate  = useNavigate();
  const [closing, setClosing] = useState(false);

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

  const handlePlayAgain = () => {
    if (onPlayAgain) {
      setClosing(true);
      setTimeout(() => onPlayAgain(), 280);
    } else {
      close(() => navigate(playAgainPath));
    }
  };

  const handleLevels = () => close(() => navigate(levelsPath));
  const handleHome   = () => close(() => navigate(homePath));

  return (
    <div className={`losing-popup${closing ? ' losing-popup--closing' : ''}`}>
      <div className="losing-popup__panel">

        <div className="losing-popup__svg-wrap">
          <img src={LoseSvg} alt="You Lost" className="losing-popup__svg" />
        </div>

        <div className="losing-popup__divider" aria-hidden="true" />

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