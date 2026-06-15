import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Level1_1.css';
import Sound_button from '../../Components/Comman/Sound_button';
import Menu_button from '../../Components/Comman/Menu_button';
import Senet_board from '../../Components/Comman/Senet_board';

const Level1_screen1 = () => {
  const navigate = useNavigate();

  const handleSequenceDone = (seq) => {
    setTimeout(() => navigate('/level1_7', { state: { sequence: seq } }), 600);
  };

  return (
    <main className='main_level1'>
      <Sound_button />
      <Menu_button />
      <Senet_board
        glowCount={5}
        mode="show"
        repeatCount={2}
        onSequenceDone={handleSequenceDone}
      />
    </main>
  );
};

export default Level1_screen1;