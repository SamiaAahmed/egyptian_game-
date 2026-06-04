import React, { useState } from 'react';
import './Menu_button.css';
import Menu_popup from './Menu_popup';
import Setting_screen from './Setting_screen';
import MenuIcon from '../../Assets/Images/menu_icon.svg';

const Menu_button = () => {
  const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Menu_popup calls onClose() normally, or onClose({ openSettings: true })
  // when the user clicked Settings inside the popup.
  const handleMenuClose = (opts) => {
    setOpen(false);
    if (opts?.openSettings) {
      setShowSettings(true);
    }
  };

  return (
    <>
      <button
        className="menu-btn"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        title="Open menu"
      >
        <img className="menu-btn__icon" src={MenuIcon} alt="Menu" />
      </button>

      {open         && <Menu_popup     onClose={handleMenuClose} />}
      {showSettings && <Setting_screen onClose={() => setShowSettings(false)} />}
    </>
  );
};

export default Menu_button;