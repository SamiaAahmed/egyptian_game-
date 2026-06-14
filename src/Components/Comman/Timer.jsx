import React, { useState, useEffect, useRef } from 'react';
import './Timer.css';
import timerSound from '../../Assets/Images/timer_sound.mp3';

const Timer = ({
  duration = 90,           // seconds — default 1 min 30 sec
  onTimeUp,                // callback when timer hits 0
  warningAt = 20,          // seconds left when warning colour kicks in
}) => {
  const [timeLeft, setTimeLeft]   = useState(duration);
  const [warning, setWarning]     = useState(false);
  const audioRef                  = useRef(null);
  const intervalRef               = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(timerSound);
    audioRef.current.loop   = false;
    audioRef.current.volume = 0.6;
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        const next = prev - 1;

        // Start warning sound loop when hitting warningAt seconds
        if (next === warningAt) {
          setWarning(true);
          if (audioRef.current) {
            audioRef.current.loop = true;
            audioRef.current.play().catch(() => {});
          }
        }

        if (next <= 0) {
          clearInterval(intervalRef.current);
          if (audioRef.current) {
            audioRef.current.loop = false;
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
          if (onTimeUp) onTimeUp();
          return 0;
        }

        return next;
      });
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  // Progress 1 → 0 as time runs out
  const progress = timeLeft / duration;

  return (
    <div className={`timer${warning ? ' timer--warning' : ''}`}>

      {/* Arc ring */}
      <svg className="timer__ring" viewBox="0 0 120 120">
        {/* Track */}
        <circle
          className="timer__ring-track"
          cx="60" cy="60" r="52"
        />
        {/* Progress arc */}
        <circle
          className="timer__ring-progress"
          cx="60" cy="60" r="52"
          style={{
            strokeDashoffset: `${(1 - progress) * 2 * Math.PI * 52}`,
          }}
        />
      </svg>

      {/* Time text */}
      <div className="timer__face">
        <span className="timer__digits">{minutes}:{seconds}</span>
      </div>

    </div>
  );
};

export default Timer;