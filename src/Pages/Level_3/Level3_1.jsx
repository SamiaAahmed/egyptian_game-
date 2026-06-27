import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Level3_1.css';
import Sound_button   from '../../Components/Comman/Sound_button';
import Menu_button    from '../../Components/Comman/Menu_button';
import Offering_board from '../../Components/Comman/Offering_board';
import Starfield      from '../../Components/Comman/Starfield';

const Level3_screen1 = () => {
  const navigate = useNavigate();

  const handleSequenceDone = (seq) => {
    setTimeout(() => navigate('/level3_game1', { state: { sequence: seq } }), 600);
  };

  return (
    <main className='main_level3'>
      <Starfield />
      <Sound_button />
      <Menu_button />
      <p className='lvl3_instruction'>You cannot speak. Watch what he believes in — and when he stopped.</p>
      <Offering_board
        glowCount={6}
        mode="show"
        repeatCount={2}
        onSequenceDone={handleSequenceDone}
      />
    </main>
  );
};

export default Level3_screen1;