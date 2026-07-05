import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Level_screen.css';
import Sound_button from '../Components/Comman/Sound_button';
import Menu_button from '../Components/Comman/Menu_button';
import Level_card from '../Components/Comman/Level_card';
import Level1Img from '../Assets/Images/level one img.png';
import Level2Img from '../Assets/Images/level two img.png';

const HIEROGLYPHS = ['𓂀', '𓆣', '𓇋', '𓅓', '𓆑', '𓂋', '𓏏', '𓈖', '𓊪', '𓅱', '𓎛', '𓄿', '𓇯', '𓆙', '𓂝', '𓃭', '𓆸', '𓏌'];

const bgParticles = Array.from({ length: 14 }, (_, i) => ({
  id: `bg-${i}`,
  glyph: HIEROGLYPHS[i % HIEROGLYPHS.length],
  left: `${(i * 7.3 + 3) % 97}%`,
  size: `${2.8 + (i % 4) * 0.6}rem`,
  duration: `${22 + (i % 7) * 3}s`,
  delay: `${-(i * 2.9) % 24}s`,
  baseOpacity: 0.04 + (i % 4) * 0.015,
}));

const fgParticles = Array.from({ length: 18 }, (_, i) => ({
  id: `fg-${i}`,
  glyph: HIEROGLYPHS[(i + 5) % HIEROGLYPHS.length],
  left: `${(i * 5.6 + 1.5) % 97}%`,
  size: `${0.8 + (i % 5) * 0.28}rem`,
  duration: `${13 + (i % 8) * 2.1}s`,
  delay: `${-(i * 1.6) % 20}s`,
  baseOpacity: 0.07 + (i % 5) * 0.03,
}));

const Level_screen = React.memo(() => {
  const navigate = useNavigate();


  const level2Unlocked = localStorage.getItem('level2_unlocked') === 'true';

  return (
    <main className='main2'>


      <div className='lvl_atmos_teal' />
      <div className='lvl_atmos_gold' />
      <div className='lvl_atmos_top' />


      <div className='lvl_particles lvl_particles_bg'>
        {bgParticles.map(p => (
          <span
            key={p.id}
            className='lvl_glyph lvl_glyph_bg'
            style={{
              left: p.left,
              fontSize: p.size,
              animationDuration: p.duration,
              animationDelay: p.delay,
              '--base-op': p.baseOpacity,
            }}
          >{p.glyph}</span>
        ))}
      </div>


      <div className='lvl_particles lvl_particles_fg'>
        {fgParticles.map(p => (
          <span
            key={p.id}
            className='lvl_glyph lvl_glyph_fg'
            style={{
              left: p.left,
              fontSize: p.size,
              animationDuration: p.duration,
              animationDelay: p.delay,
              '--base-op': p.baseOpacity,
            }}
          >{p.glyph}</span>
        ))}
      </div>


      <Sound_button />
      <Menu_button />


      <div className='lvl_cards_wrap'>
        <div className='lvl_row_top'>
          <Level_card
            image={Level1Img}
            levelNumber={1}
            title="The Unspoken Name"
            description="The Nile rises. Ancient secrets stir."
            onClick={() => navigate('/game')}
          />
        </div>
        <div className='lvl_row_bottom'>
          <Level_card
            image={Level2Img}
            levelNumber={2}
            title="Forgotten Map"
            description="Beyond the delta, a forgotten city waits."
            onClick={level2Unlocked ? () => navigate('/level2_start') : undefined}
          />
          <Level_card
            image={Level2Img}
            levelNumber={3}
            title="The Priest Who Doubted"
            description="Presence the courage to stay when belief has gone"
            onClick={() => navigate('/level3_1')}
          />
        </div>
      </div>

    </main>
  );
});

export default Level_screen;