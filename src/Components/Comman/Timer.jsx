import React, { useState, useEffect, useRef } from 'react';
import './Timer.css';
import timerSound from '../../Assets/Sound/timer_sound.mp3';

const Timer = ({
  duration = 60,          
  onTimeUp,                
  warningAt = 20,       
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


  const progress = timeLeft / duration;

  return (
    <div className={`timer${warning ? ' timer--warning' : ''}`}>

      
      <svg className="timer__ring" viewBox="0 0 120 120">
        
        <circle
          className="timer__ring-track"
          cx="60" cy="60" r="52"
        />
       
        <circle
          className="timer__ring-progress"
          cx="60" cy="60" r="52"
          style={{
            strokeDashoffset: `${(1 - progress) * 2 * Math.PI * 52}`,
          }}
        />
      </svg>

    
      <div className="timer__face">
        <span className="timer__digits">{minutes}:{seconds}</span>
      </div>

    </div>
  );
};

export default Timer;