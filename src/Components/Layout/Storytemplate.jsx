import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Storytemplate.css';
import Sound_button   from '../Comman/Sound_button';
import Setting_screen from '../Comman/Setting_screen';
import Menu_button    from '../Comman/Menu_button';

const Storytemplate = ({ background, nextPath }) => {
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

export default Storytemplate;