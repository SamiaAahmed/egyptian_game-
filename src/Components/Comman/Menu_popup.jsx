import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu_popup.css';
import Setting_screen from './Setting_screen';

const Menu_popup = ({ onClose }) => {
  const navigate = useNavigate();
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const close = () => {
    setClosing(true);
    setTimeout(onClose, 280);
  };

  const handleResume = () => {
    close();
  };

  // Close the menu popup, then tell the parent to open Settings
  const handleSettings = () => {
    setClosing(true);
    setTimeout(() => onClose({ openSettings: true }), 280);
  };

  const handleHome = () => {
    close();
    setTimeout(() => navigate('/menu'), 280);
  };

  return (
    <div className={`menu-popup${closing ? ' menu-popup--closing' : ''}`}>
      <div className="menu-popup__panel">
        <span className="menu-popup__title">Menu</span>
        <div className="menu-popup__divider" aria-hidden="true" />
        <button className="menu-popup__btn" onClick={handleResume}>
          Resume
        </button>
        <button className="menu-popup__btn" onClick={handleSettings}>
          Settings
        </button>
        <button className="menu-popup__btn menu-popup__btn--home" onClick={handleHome}>
          Home
        </button>
      </div>
    </div>
  );
};

export default Menu_popup;