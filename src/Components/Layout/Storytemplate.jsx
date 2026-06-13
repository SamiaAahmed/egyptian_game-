import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu_screen.css';
import Sound_button  from '../Components/Comman/Sound_button';
import Setting_screen from '../Components/Comman/Setting_screen';
import Menu_button    from '../Components/Comman/Menu_button';

const Menu_screen = ({ background, nextPath }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (nextPath) navigate(nextPath);
  };

  return (
    <main
      className="main_intro1"
      onClick={handleClick}
      style={{
        backgroundImage: `url(${background})`,
        cursor: nextPath ? 'pointer' : 'default',
      }}
    >
      <Sound_button />
      <Menu_button />

    </main>
  );
};

export default Menu_screen;