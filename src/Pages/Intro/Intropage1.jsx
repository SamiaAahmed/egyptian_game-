import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Intropage1.css';
import Menu_button from '../../Components/Comman/Menu_button';
import Game_logo from '../../Assets/Images/Itrue_game_logo.svg';
import Sound_button from '../../Components/Comman/Sound_button';

const GLYPHS = ['𓂀', '𓃭', '𓆣', '𓇯', '𓈖', '𓉐', '𓋴', '𓌀', '𓍯', '𓎛', '𓏏', '𓀭', '𓁹', '𓂋'];

const PARTICLES = Array.from({ length: 26 }, (_, i) => ({
  i,
  left:     2  + Math.random() * 96,
  duration: 14 + Math.random() * 12,
  delay:    Math.random() * 14,
  size:     26 + Math.random() * 32,
  opacity:  0.35 + Math.random() * 0.35,
  glyph:    GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
}));

const Particles = React.memo(() => (
  <div className="menu-particles" aria-hidden="true">
    {PARTICLES.map(p => (
      <span
        key={p.i}
        className="menu-particle"
        style={{
          left:              `${p.left}%`,
          fontSize:          `${p.size}px`,
          animationDuration: `${p.duration}s`,
          animationDelay:    `${p.delay}s`,
          '--p-opacity':     p.opacity,
        }}
      >
        {p.glyph}
      </span>
    ))}
  </div>
));

const Intro1_screen = () => {
  const navigate = useNavigate();
  const [typingDone, setTypingDone] = useState(false);

  const handleScreenClick = useCallback(() => {
    if (!typingDone) return;
    navigate('/story2');
  }, [typingDone, navigate]);

  const handleSkip = useCallback((e) => {
    e.stopPropagation();
    navigate('/menu');
  }, [navigate]);

  // "Never forgets" finishes its glowReveal animation
  const handleTextAnimationEnd = useCallback(() => {
    setTypingDone(true);
  }, []);

  return (
    <main
      className='main3'
      onClick={handleScreenClick}
      style={{ cursor: typingDone ? 'pointer' : 'default' }}
    >
      <Sound_button />
      <Menu_button />

      <Particles />

      <div className='story1_center'>
        <img
          className='game_logo story1_logo_reveal'
          src={Game_logo}
          alt="Game Logo"
        />

        <div className='loading_screen_div1-1'>
          <div className='loading_screen_div3-1'>
            <h1
              className='text1 story1_text_reveal'
              onAnimationEnd={handleTextAnimationEnd}
            >
              Never forgets
            </h1>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Intro1_screen;