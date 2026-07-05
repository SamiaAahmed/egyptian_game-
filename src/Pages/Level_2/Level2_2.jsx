import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Level2_2.css';
import Sound_button   from '../../Components/Comman/Sound_button';
import Menu_button    from '../../Components/Comman/Menu_button';
import Papyrus_board  from '../../Components/Comman/Papyrus_board';
import Starfield      from '../../Components/Comman/Starfield';
import Timer          from '../../Components/Comman/Timer';
import Losing_screen  from '../Losing_screen';
import Winning_screen from '../Winning_screen';

const Level2_screen2 = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const sequence  = location.state?.sequence ?? [];

  const [showLose, setShowLose] = useState(false);
  const [showWin,  setShowWin]  = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [boardKey, setBoardKey] = useState(0);


  const [flickerActive, setFlickerActive] = useState(false);
  const flickerOnTimeout  = useRef(null);
  const flickerOffTimeout = useRef(null);

  useEffect(() => {
    if (showLose || showWin) {
      clearTimeout(flickerOnTimeout.current);
      clearTimeout(flickerOffTimeout.current);
      setFlickerActive(false);
      return;
    }

    const scheduleNextFlicker = () => {
      const delay = 400 + Math.random() * 2000; 
      flickerOnTimeout.current = setTimeout(() => {
        setFlickerActive(true);
        flickerOffTimeout.current = setTimeout(() => {
          setFlickerActive(false);
          scheduleNextFlicker();
        }, 500);
      }, delay);
    };

    scheduleNextFlicker();

    return () => {
      clearTimeout(flickerOnTimeout.current);
      clearTimeout(flickerOffTimeout.current);
    };
  }, [showLose, showWin, boardKey]);

  const handleWin = () => {
    localStorage.setItem('level3_unlocked', 'true');
    setShowWin(true);
  };

  const handlePlayAgain = () => {
    setShowLose(false);
    setShowWin(false);
    setTimerKey(prev => prev + 1);
    setBoardKey(prev => prev + 1);
  };

  return (
    <main className='main_level2'>
      <Starfield />
      <Sound_button />
      <Menu_button />

      <p className='lvl2_instruction'>Tap the panels in the order she surveyed them.</p>

      <Timer
        key={timerKey}
        duration={60}
        warningAt={20}
        onTimeUp={() => setShowLose(true)}
      />

      <Papyrus_board
        key={boardKey}
        mode="input"
        sequence={sequence}
        onSuccess={handleWin}
        onFail={() => setShowLose(true)}
      />

      <div
        className={`lvl2_flicker_overlay${flickerActive ? ' active' : ''}`}
        aria-hidden="true"
      />

      {showLose && (
        <Losing_screen
          playAgainPath="/level2_game"
          levelsPath="/levels"
          homePath="/menu"
          onClose={handlePlayAgain}
        />
      )}

      {showWin && (
        <Winning_screen
          nextPath="/levels"
          homePath="/menu"
          onClose={() => setShowWin(false)}
        />
      )}
    </main>
  );
};

export default Level2_screen2;