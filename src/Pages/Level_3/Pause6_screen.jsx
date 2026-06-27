import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pause6_screen.css';
import Menu_button from '../../Components/Comman/Menu_button';
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

const Pause6_screen = () => {
  const navigate = useNavigate();
  const [typingDone, setTypingDone] = useState(false);

  const handleTextAnimationEnd = useCallback(() => {
    setTypingDone(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        if (typingDone) navigate('/level3_game');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [typingDone, navigate]);

  return (
    <main className='main_level_2pause'>
      <Sound_button />
      <Menu_button />

      <Particles />

      <div className='story1_center'>
        <div className='loading_screen_div1-1'>
          <div className='loading_screen_div3-1'>
            <h1
              className='text1 story1_text_reveal'
              onAnimationEnd={handleTextAnimationEnd}
            >
              "WATCH CAREFULLY"<br />
              "The room will shake. The room will doubt itself."<br />
              "Stay still when it does."
            </h1>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Pause6_screen;