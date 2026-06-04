import React, { useState } from 'react';
import './Menu_screen.css';
import Game_logo     from '../Assets/Images/Itrue_game_logo.svg';
import Menu          from '../Components/Layout/Menu';
import Sound_button  from '../Components/Comman/Sound_button';
import Setting_screen from '../Components/Comman/Setting_screen';

const Menu_screen = () => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <main>
      <Sound_button />

      <div className='loading_screen_div1'>
        <img className='game_logo' src={Game_logo} alt="Game Logo" />
        <div className='loading_screen_div3'>
          <h1 className='text1'>The Living Archive</h1>
          <h3 className='text2'>
            Where the river remembers what the world forgets
          </h3>
        </div>
      </div>

      <div className='menu_screen_bottom'>
        {/* Pass onOpenSettings so Menu can trigger the overlay */}
        <Menu onOpenSettings={() => setShowSettings(true)} />
      </div>

      {showSettings && (
        <Setting_screen onClose={() => setShowSettings(false)} />
      )}
    </main>
  );
};

export default Menu_screen;