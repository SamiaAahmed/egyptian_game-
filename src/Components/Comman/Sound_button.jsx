import React, { useEffect, useRef, useState } from 'react';
import './Sound_button.css';
import SoundOnIcon  from '../../Assets/Images/sound_icon.svg';
import SoundOffIcon from '../../Assets/Images/sound2_icon.svg';
import GameSound    from '../../Assets/Sound/Itrue_game_sound.mpeg';

const Sound_button = ({ hidden = false }) => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(GameSound);
    audio.loop   = true;
    audio.volume = 0.6;
    audioRef.current = audio;

    audio.play().catch(() => {});

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
        hidden  ? 'sound-btn--hidden' : '',
      ].join(' ')}
      onClick={!hidden ? toggle : undefined}
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