import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Level1_1.css';
import Sound_button from '../../Components/Comman/Sound_button';
import Menu_button from '../../Components/Comman/Menu_button';
import Senet_boared from '../../Assets/Images/senet boared.png'


const Level1_screen1 = () => {
  const navigate = useNavigate();

  return (
    <main className='main_level1'>
      <Sound_button />
      <Menu_button />

     <img className='senet_boared' src={Senet_boared} alt="" />

    </main>
  );
};

export default Level1_screen1 ;