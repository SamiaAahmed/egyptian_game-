import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Storytemplate.css';
import Sound_button   from '../Comman/Sound_button';
import Setting_screen from '../Comman/Setting_screen';
import Menu_button    from '../Comman/Menu_button';
import Textbox        from '../Comman/textbox';

const Storytemplate = ({
  background,
  backgroundVideo,
  nextPath,
  lines = [],
  quoteIndex = -1,
  continueText = 'Press space to continue',
}) => {
  const navigate = useNavigate();
  const [typingDone, setTypingDone] = useState(false);

  // Allow either an explicit backgroundVideo prop, OR auto-detect
  // if `background` itself points to a video file.
  const isVideo =
    !!backgroundVideo ||
    (typeof background === 'string' && /\.(mp4|webm|ogg)$/i.test(background));

  const videoSrc = backgroundVideo || background;

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
      style={!isVideo ? { backgroundImage: `url(${background})` } : undefined}
    >
      {isVideo && (
        <video className="main_video" autoPlay muted loop playsInline>
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

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