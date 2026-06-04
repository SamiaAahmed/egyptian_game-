import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Setting_screen.css';
import SoundOnIcon  from '../../Assets/Images/sound_icon.svg';
import SoundOffIcon from '../../Assets/Images/sound2_icon.svg';

const Setting_screen = ({ onClose, audioRef }) => {
  const navigate = useNavigate();
  const [closing, setClosing] = useState(false);
  const [volume, setVolume]   = useState(60);
  const [isMuted, setIsMuted] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Sync volume with shared audio ref if provided
  useEffect(() => {
    if (!audioRef?.current) return;
    audioRef.current.volume = isMuted ? 0 : volume / 100;
  }, [volume, isMuted, audioRef]);

  const close = () => {
    setClosing(true);
    setTimeout(onClose, 280);
  };

  const handleVolumeChange = (e) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (val > 0 && isMuted) setIsMuted(false);
    if (val === 0) setIsMuted(true);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const handleHome = () => {
    close();
    setTimeout(() => navigate('/menu'), 280);
  };

  const handleResume = () => {
    close();
  };

  const sliderStyle = { '--val': `${isMuted ? 0 : volume}%` };

  return (
    <div className={`settings-popup${closing ? ' settings-popup--closing' : ''}`}>
      <div className="settings-popup__panel">

        {/* Title */}
        <span className="settings-popup__title">Settings</span>

        {/* Divider */}
        <div className="settings-popup__divider" aria-hidden="true" />

        {/* ── Volume row ── */}
        <div className="settings-popup__row">
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            title={isMuted ? 'Unmute' : 'Mute'}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex' }}
          >
            <img
              className="settings-popup__row-icon"
              src={isMuted ? SoundOffIcon : SoundOnIcon}
              alt={isMuted ? 'Muted' : 'Sound on'}
            />
          </button>
          <span className="settings-popup__row-label">Sound</span>
          <input
            className="settings-popup__slider"
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            style={sliderStyle}
            aria-label="Volume"
          />
        </div>

        {/* ── Language row ── */}
        <div className="settings-popup__row">
          <span className="settings-popup__row-label" style={{ flex: 1 }}>
            Language
          </span>
          <button className="settings-popup__lang-btn" disabled title="Coming soon">
            EN ▾
          </button>
        </div>

        {/* ── Bottom buttons ── */}
        <div className="settings-popup__bottom">
          <button className="settings-popup__btn" onClick={handleHome}>
            Home
          </button>
          <button className="settings-popup__btn" onClick={handleResume}>
            Resume
          </button>
        </div>

      </div>
    </div>
  );
};

export default Setting_screen;