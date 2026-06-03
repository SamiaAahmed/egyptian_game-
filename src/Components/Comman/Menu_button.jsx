import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu_button.css';
import MenuIcon from '../../Assets/Images/menu_icon.svg';

const Menu_button = () => {
  const navigate = useNavigate();

  return (
    <button
      className="menu-btn"
      onClick={() => navigate('/menu')}
      aria-label="Open menu"
      title="Open menu"
    >
      <img
        className="menu-btn__icon"
        src={MenuIcon}
        alt="Menu"
      />
    </button>
  );
};

export default Menu_button;