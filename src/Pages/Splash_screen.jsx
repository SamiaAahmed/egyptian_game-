import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sound_button from '../Components/Comman/Sound_button';
import './Splash_screen.css';
import Game_logo from '../Assets/Images/Itrue_game_logo.svg';
import Divider from '../Assets/Images/Line divider.svg';

const Splash_screen = () => {
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = () => {
      navigate('/menu');
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate]);

  return (
    <main>
      {/* Mounted but invisible — keeps audio alive across the route transition */}
      <Sound_button hidden />

      <div className='loading_screen_div2'>
        <div className='loading_screen_div1'>
          <img className='game_logo' src={Game_logo} alt='Game Logo' />
          <div className='loading_screen_div3'>
            <h1 className='text1'>The Living Archive</h1>
            <h3 className='text2'>
              Where the river remembers what the world forgets
            </h3>
          </div>
        </div>

        <div className='splash_screen_div1'>
          <img className='divider_line' src={Divider} alt='' />
          <h3 className='text3 pulse-glow'>PRESS ANY KEY TO BEGIN</h3>
          <img className='divider_line2' src={Divider} alt='' />
        </div>
      </div>
    </main>
  );
};

export default Splash_screen;