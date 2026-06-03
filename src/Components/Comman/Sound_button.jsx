import React, { useEffect, useRef, useState } from 'react';
import './Sound_button.css';
import SoundOnIcon  from '../../Assets/Images/sound_icon.svg';
import SoundOffIcon from '../../Assets/Images/sound2_icon.svg';
import GameSound    from '../../Assets/Sounds/Itrue_game_sound.mpeg';

const Sound_button = () => {
  // Music plays by default
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // Create the audio element once on mount and start playing
  useEffect(() => {
    const audio = new Audio(GameSound);
    audio.loop   = true;
    audio.volume = 0.6;
    audioRef.current = audio;

    // Autoplay — browsers may block this until a user interaction has
    // occurred on the page. The button itself counts as that interaction
    // so the first click will always start audio if autoplay was blocked.
    audio.play().catch(() => {
      // Autoplay blocked — silently wait for first user click
    });

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.play().catch(() => {});
      setIsMuted(false);
    } else {
      audio.pause();
      setIsMuted(true);
    }
  };

  return (
    <button
      className={[
        'sound-btn',
        isMuted ? 'sound-btn--muted' : 'sound-btn--playing',
      ].join(' ')}
      onClick={toggle}
      aria-label={isMuted ? 'Unmute music' : 'Mute music'}
      title={isMuted ? 'Unmute music' : 'Mute music'}
    >
      <img
        className="sound-btn__icon"
        src={isMuted ? SoundOffIcon : SoundOnIcon}
        alt={isMuted ? 'Muted' : 'Playing'}
      />
    </button>
  );
};

export default Sound_button;