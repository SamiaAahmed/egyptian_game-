import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Intropage1.css';
import Menu_button from '../../Components/Comman/Menu_button';
import Game_logo from '../../Assets/Images/Itrue_game_logo.svg';
import Intro1 from '../../Assets/Images/intro1.jpg';
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

// The lines of narration, each typed one after the other
const LINES = [
  'In the modern city of Kemet.',
  'A city built on top of a kingdom that never fully died.',
  '"The ancient river still runs"',
  'Its called ITERU',
];

const CHAR_DELAY    = 48;   // ms per character
const LINE_PAUSE    = 700;  // ms pause between lines
const TEXT_START_MS = 4400; // when text box appears

const Intro1_screen = () => {
  const navigate = useNavigate();

  const [displayedLines, setDisplayedLines] = useState(['', '', '', '']);
  const [typingDone, setTypingDone]         = useState(false);
  const [textBoxVisible, setTextBoxVisible] = useState(false);
  const [clickHint, setClickHint]           = useState(false);

  // Show text box shortly after logo/title animations settle
  useEffect(() => {
    const t = setTimeout(() => setTextBoxVisible(true), TEXT_START_MS);
    return () => clearTimeout(t);
  }, []);

  // Typewriter effect — runs after text box appears
  useEffect(() => {
    if (!textBoxVisible) return;

    let lineIdx = 0;
    let charIdx = 0;
    let timeout;

    const tick = () => {
      if (lineIdx >= LINES.length) {
        setTypingDone(true);
        setTimeout(() => setClickHint(true), 400);
        return;
      }

      const line = LINES[lineIdx];

      if (charIdx <= line.length) {
        setDisplayedLines(prev => {
          const next = [...prev];
          next[lineIdx] = line.slice(0, charIdx);
          return next;
        });
        charIdx++;
        timeout = setTimeout(tick, CHAR_DELAY);
      } else {
        lineIdx++;
        charIdx = 0;
        timeout = setTimeout(tick, LINE_PAUSE);
      }
    };

    timeout = setTimeout(tick, 300);
    return () => clearTimeout(timeout);
  }, [textBoxVisible]);

  // Click anywhere (after typing done) → navigate to Story2
  const handleScreenClick = useCallback(() => {
    if (!typingDone) return;
    navigate('/story2');
  }, [typingDone, navigate]);

  // Skip → go to Menu
  const handleSkip = useCallback((e) => {
    e.stopPropagation();
    navigate('/menu');
  }, [navigate]);

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
            <h1 className='text1 story1_text_reveal'>Never forgets</h1>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Intro1_screen;