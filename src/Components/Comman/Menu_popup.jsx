import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu_popup.css';

const Menu_popup = ({ onClose }) => {
  const navigate = useNavigate();
  const [closing, setClosing] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Play the closing animation then call the parent's onClose
  const close = () => {
    setClosing(true);
    setTimeout(onClose, 280);
  };

  const handleResume = () => {
    close();
  };

  const handleSettings = () => {
    close();
    setTimeout(() => navigate('/settings'), 280);
  };

  const handleHome = () => {
    close();
    setTimeout(() => navigate('/menu'), 280);
  };

  return (
    <div
      className={`menu-popup${closing ? ' menu-popup--closing' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div className="menu-popup__panel">

        {/* Header title */}
        <span className="menu-popup__title">Menu</span>

        {/* Divider */}
        <div className="menu-popup__divider" aria-hidden="true" />

        {/* Resume */}
        <button className="menu-popup__btn" onClick={handleResume}>
          Resume
        </button>

        {/* Settings */}
        <button className="menu-popup__btn" onClick={handleSettings}>
          Settings
        </button>

        {/* Home */}
        <button className="menu-popup__btn menu-popup__btn--home" onClick={handleHome}>
          Home
        </button>

      </div>
    </div>
  );
};

export default Menu_popup;