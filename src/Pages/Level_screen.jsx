import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Level_screen.css';
import Sound_button from '../Components/Comman/Sound_button';
import Menu_button from '../Components/Comman/Menu_button';
import Level_card from '../Components/Comman/Level_card';
import Level1Img from '../Assets/Images/level one img.png';
import Level2Img from '../Assets/Images/level two img.png';

const Level_screen = () => {
  const navigate = useNavigate();

  return (
    <main className='main2'>
      <Sound_button />
      <Menu_button />

      <Level_card
        image={Level1Img}
        levelNumber={1}
        title="The Unspoken Name"
        description="The Nile rises. Ancient secrets stir."
        onClick={() => navigate('/game')}
      />

      <Level_card
        image={Level2Img}
        levelNumber={2}
        title="Forgotten Map"
        description="Beyond the delta, a forgotten city waits."
        locked={true}
      />

            <Level_card
        image={Level2Img}
        levelNumber={3}
        title="Forgotten Maps"
        description="Beyond the delta, a forgotten city waits."
        locked={true}
      />

          <Level_card
        image={Level2Img}
        levelNumber={4}
        title="Forgotten Map"
        description="Beyond the delta, a forgotten city waits."
        locked={true}
      />
    </main>
  );
};

export default Level_screen;