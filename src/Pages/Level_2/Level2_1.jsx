import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Level2_1.css';
import Sound_button from '../../Components/Comman/Sound_button';
import Menu_button  from '../../Components/Comman/Menu_button';
import Papyrus_board from '../../Components/Comman/Papyrus_board';
import Starfield from '../../Components/Comman/Starfield';

const Level2_screen1 = () => {
  const navigate = useNavigate();

  const handleSequenceDone = (seq) => {
    setTimeout(() => navigate('/level2_game1', { state: { sequence: seq } }), 600);
  };

  return (
    <main className='main_level2'>
      <Starfield />
      <Sound_button />
      <Menu_button />
      <p className='lvl2_instruction'>You cannot speak. But you can see what she sees.</p>
      <Papyrus_board
        glowCount={5}
        mode="show"
        repeatCount={2}
        onSequenceDone={handleSequenceDone}
      />
    </main>
  );
};

export default Level2_screen1;