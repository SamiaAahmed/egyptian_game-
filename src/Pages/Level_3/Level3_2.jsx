import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Level3_2.css';
import Sound_button    from '../../Components/Comman/Sound_button';
import Menu_button     from '../../Components/Comman/Menu_button';
import Offering_board  from '../../Components/Comman/Offering_board';
import Starfield       from '../../Components/Comman/Starfield';
import Timer           from '../../Components/Comman/Timer';
import Losing_screen   from '../Losing_screen';
import Winning_screen  from '../Winning_screen';

const Level3_screen2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sequence = location.state?.sequence ?? [];

  const [showLose, setShowLose] = useState(false);
  const [showWin,  setShowWin]  = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [boardKey, setBoardKey] = useState(0);


  const [torchPos, setTorchPos] = useState({ x: -300, y: -300 });
  const mainRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    setTorchPos({ x: e.clientX, y: e.clientY });

    const xPct = (e.clientX / window.innerWidth)  * 100;
    const yPct = (e.clientY / window.innerHeight) * 100;
    document.documentElement.style.setProperty('--torch-x', `${xPct}%`);
    document.documentElement.style.setProperty('--torch-y', `${yPct}%`);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);


  const [litActive, setLitActive]       = useState(false);
  const litOnTimeout  = useRef(null);
  const litOffTimeout = useRef(null);
  const clickCaptureRef = useRef(null);

  const handleCaptureClick = useCallback((e) => {
    if (showLose || showWin) return;
    const grid = document.querySelector('.offering-grid-3');
    if (!grid) return;
    if (clickCaptureRef.current) clickCaptureRef.current.style.pointerEvents = 'none';
    const el = document.elementFromPoint(e.clientX, e.clientY);
    if (clickCaptureRef.current) clickCaptureRef.current.style.pointerEvents = 'all';
    if (el && el.classList.contains('offering-cell')) {
      el.click();
    }
  }, [showLose, showWin]);

  useEffect(() => {
    if (showLose || showWin) {
      clearTimeout(litOnTimeout.current);
      clearTimeout(litOffTimeout.current);
      setLitActive(false);
      return;
    }

    const scheduleNextFlash = () => {
      const delay = 3000 + Math.random() * 2000;
      litOnTimeout.current = setTimeout(() => {
        setLitActive(true);
        litOffTimeout.current = setTimeout(() => {
          setLitActive(false);
          scheduleNextFlash();
        }, 650);
      }, delay);
    };

    scheduleNextFlash();

    return () => {
      clearTimeout(litOnTimeout.current);
      clearTimeout(litOffTimeout.current);
    };
  }, [showLose, showWin, boardKey]);

  const [doubtActive, setDoubtActive] = useState(false);
  const doubtOnTimeout  = useRef(null);
  const doubtOffTimeout = useRef(null);

  useEffect(() => {
    if (showLose || showWin) {
      clearTimeout(doubtOnTimeout.current);
      clearTimeout(doubtOffTimeout.current);
      setDoubtActive(false);
      return;
    }

    const scheduleNextDoubt = () => {
      const delay = 3000 + Math.random() * 1000;
      doubtOnTimeout.current = setTimeout(() => {
        setDoubtActive(true);
        doubtOffTimeout.current = setTimeout(() => {
          setDoubtActive(false);
          scheduleNextDoubt();
        }, 1200);
      }, delay);
    };

    scheduleNextDoubt();

    return () => {
      clearTimeout(doubtOnTimeout.current);
      clearTimeout(doubtOffTimeout.current);
    };
  }, [showLose, showWin, boardKey]);

  const handleWin = () => {
    localStorage.setItem('level4_unlocked', 'true');
    setShowWin(true);
  };

  const handlePlayAgain = () => {
    setShowLose(false);
    setShowWin(false);
    setTimerKey(prev => prev + 1);
    setBoardKey(prev => prev + 1);
  };

  return (
    <main className='main_level3'>
      <Starfield />
      <Sound_button />
      <Menu_button />

      <p className='lvl3_instruction'>Tap in the order he lost faith. Not the order of the rite.</p>

      <Timer
        key={timerKey}
        duration={60}
        warningAt={30}
        onTimeUp={() => setShowLose(true)}
      />

      <Offering_board
        key={boardKey}
        mode="input"
        sequence={sequence}
        doubtActive={doubtActive}
        onSuccess={handleWin}
        onFail={() => setShowLose(true)}
      />


      {!showLose && !showWin && (
        <>
          <div className="lvl3_bg_bloom" aria-hidden="true" />
          <div
            className={`lvl3_darkness${litActive ? ' lit' : ''}`}
            aria-hidden="true"
          />
        </>
      )}


      {!showLose && !showWin && (
        <>
          <div
            className="lvl3_torch"
            aria-hidden="true"
            style={{ left: torchPos.x, top: torchPos.y, pointerEvents: 'none' }}
          />
          <div
            className={`lvl3_doubt_overlay${doubtActive ? ' active' : ''}`}
            aria-hidden="true"
          />
        </>
      )}

      {showLose && (
        <Losing_screen
          playAgainPath="/level3_game"
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


      {!showLose && !showWin && (
        <div
          ref={clickCaptureRef}
          onClick={handleCaptureClick}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 600,
            background: 'transparent',
            cursor: 'none',
          }}
        />
      )}
    </main>
  );
};

export default Level3_screen2;