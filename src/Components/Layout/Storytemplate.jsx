import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Storytemplate.css';
import Sound_button   from '../Comman/Sound_button';
import Setting_screen from '../Comman/Setting_screen';
import Menu_button    from '../Comman/Menu_button';

const Storytemplate = ({ background, nextPath }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        if (nextPath) navigate(nextPath);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextPath, navigate]);

  return (
    <main
      className="main_intro1"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <Sound_button />
      <Menu_button />
    </main>
  );
};

export default Storytemplate;