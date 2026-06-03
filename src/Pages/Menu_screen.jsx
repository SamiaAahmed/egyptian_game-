import React from 'react';
import './Menu_screen.css';
import Game_logo    from '../Assets/Images/Itrue_game_logo.svg';
import Menu         from '../Components/Layout/Menu';
import Sound_button from '../Components/Comman/Sound_button';
import Menu_button from '../Components/Comman/Menu_button';

const Menu_screen = () => {
  return (
    <main>
      {/* Sound toggle — fixed top-left */}
      <Sound_button />
      <Menu_button />
      
      {/* Top: logo + title */}
      <div className='loading_screen_div1'>
        <img className='game_logo' src={Game_logo} alt="Game Logo" />
        <div className='loading_screen_div3'>
          <h1 className='text1'>The Living Archive</h1>
          <h3 className='text2'>
            Where the river remembers what the world forgets
          </h3>
        </div>
      </div>

      {/* Bottom: menu navigation */}
      <div className='menu_screen_bottom'>
        <Menu />
      </div>
    </main>
  );
};

export default Menu_screen;