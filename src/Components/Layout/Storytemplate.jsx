import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Storytemplate.css';
import Sound_button   from '../Comman/Sound_button';
import Setting_screen from '../Comman/Setting_screen';
import Menu_button    from '../Comman/Menu_button';
import Textbox         from '../Comman/textbox';

const Storytemplate = ({
  background,
  nextPath,
  lines = [],
  quoteIndex = -1,
  continueText = 'Press space to continue',
}) => {
  const navigate = useNavigate();
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        if (typingDone && nextPath) navigate(nextPath);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [typingDone, nextPath, navigate]);

  return (
    <main
      className="main_intro1"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <Sound_button />
      <Menu_button />

      <Textbox
        lines={lines}
        quoteIndex={quoteIndex}
        continueText={continueText}
        onTypingDone={() => setTypingDone(true)}
      />
    </main>
  );
};

export default Storytemplate;