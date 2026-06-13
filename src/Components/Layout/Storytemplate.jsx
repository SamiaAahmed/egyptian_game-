import React, { useState } from 'react';
import './Menu_screen.css';
import Sound_button  from '../Components/Comman/Sound_button';
import Setting_screen from '../Components/Comman/Setting_screen';
import Menu_button    from '../Components/Comman/Menu_button';

const Menu_screen = () => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <main>
      <Sound_button />
      <Menu_button />
  
    </main>
  );
};

export default Menu_screen;