import React, { useState } from 'react';
import './Menu_button.css';
import Menu_popup from './Menu_popup';
import MenuIcon from '../../Assets/Images/menu_icon.svg';

const Menu_button = () => {
  const [open, setOpen] = useState(false);

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

      {open && <Menu_popup onClose={() => setOpen(false)} />}
    </>
  );
};

export default Menu_button;