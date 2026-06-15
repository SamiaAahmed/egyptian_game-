import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Winning_screen.css';
import WinSvg from '../Assets/Images/win_svg.svg';

const Winning_screen = ({
  nextPath   = '/levels',
  homePath   = '/menu',
  onClose,
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

  const handleNext = () => close(() => navigate(nextPath));
  const handleHome = () => close(() => navigate(homePath));

  return (
    <div className={`winning-popup${closing ? ' winning-popup--closing' : ''}`}>
      <div className="winning-popup__panel">

        <div className="winning-popup__svg-wrap">
          <img src={WinSvg} alt="You Won" className="winning-popup__svg" />
        </div>

        <div className="winning-popup__divider" aria-hidden="true" />

        <button className="winning-popup__btn" onClick={handleNext}>
          Next Level
        </button>
        <button className="winning-popup__btn winning-popup__btn--home" onClick={handleHome}>
          Home
        </button>

      </div>
    </div>
  );
};

export default Winning_screen;