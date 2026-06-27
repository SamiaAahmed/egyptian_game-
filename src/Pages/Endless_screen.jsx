import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Endless_screen.css';
import Sound_button from '../Components/Comman/Sound_button';
import Menu_button  from '../Components/Comman/Menu_button';
import Senet_board  from '../Components/Comman/Senet_board';
import Timer        from '../Components/Comman/Timer';
import LoseSvg      from '../Assets/Images/lose_svg.svg';

const STARTING_COUNT = 3;

const Endless_screen = () => {
  const navigate = useNavigate();

  const [round,      setRound]      = useState(1);
  const [glowCount,  setGlowCount]  = useState(STARTING_COUNT);
  const [phase,      setPhase]      = useState('show');   // 'show' | 'input'
  const [sequence,   setSequence]   = useState([]);
  const [bestRound,  setBestRound]  = useState(
    () => parseInt(localStorage.getItem('endless_best') ?? '0', 10)
  );
  const [dead,       setDead]       = useState(false);
  const [closing,    setClosing]    = useState(false);
  const [boardKey,   setBoardKey]   = useState(0);
  const [timerKey,   setTimerKey]   = useState(0);

  /* Show phase finished → switch to input phase */
  const handleSequenceDone = useCallback((seq) => {
    setSequence(seq);
    setPhase('input');
  }, []);

  /* Save best helper */
  const saveBest = useCallback((completedRound) => {
    if (completedRound > bestRound) {
      setBestRound(completedRound);
      localStorage.setItem('endless_best', String(completedRound));
    }
  }, [bestRound]);

  /* Player matched correctly → next round */
  const handleSuccess = useCallback(() => {
    saveBest(round);
    setRound(r => r + 1);
    setGlowCount(c => c + 1);
    setPhase('show');
    setBoardKey(k => k + 1);
    setTimerKey(k => k + 1);   // reset timer each round
  }, [round, saveBest]);

  /* Timer up or wrong click → game over */
  const handleFail = useCallback(() => {
    saveBest(round - 1);
    setDead(true);
  }, [round, saveBest]);

  /* Close overlay with animation then restart */
  const handleRestart = () => {
    setClosing(true);
    setTimeout(() => {
      setRound(1);
      setGlowCount(STARTING_COUNT);
      setPhase('show');
      setSequence([]);
      setDead(false);
      setClosing(false);
      setBoardKey(k => k + 1);
      setTimerKey(k => k + 1);
    }, 280);
  };

  const handleHome = () => {
    setClosing(true);
    setTimeout(() => navigate('/menu'), 280);
  };

  const handleLevels = () => {
    setClosing(true);
    setTimeout(() => navigate('/levels'), 280);
  };

  return (
    <main className='endless_main'>
      <Sound_button />
      <Menu_button />

      {/* ── Atmosphere ── */}
      <div className='endless_atmos' />

      {/* ── Timer (only during input phase) ── */}
      {phase === 'input' && !dead && (
        <Timer key={timerKey} duration={60} onTimeUp={handleFail} />
      )}

      {/* ── HUD ── */}
      <div className='endless_hud'>
        <div className='endless_stat'>
          <span className='endless_stat_label'>Round</span>
          <span className='endless_stat_value'>{round}</span>
        </div>
        <div className='endless_hud_divider'>𓂀</div>
        <div className='endless_stat'>
          <span className='endless_stat_label'>Best</span>
          <span className='endless_stat_value'>{bestRound}</span>
        </div>
      </div>

      {/* ── Phase label ── */}
      <p className='endless_phase_label'>
        {phase === 'show' ? 'Watch the sequence…' : 'Repeat the sequence'}
      </p>

      {/* ── Board ── */}
      <Senet_board
        key={boardKey}
        glowCount={glowCount}
        mode={phase === 'show' ? 'show' : 'input'}
        repeatCount={1}
        sequence={phase === 'input' ? sequence : undefined}
        onSequenceDone={phase === 'show' ? handleSequenceDone : undefined}
        onSuccess={phase === 'input' ? handleSuccess : undefined}
        onFail={phase === 'input' ? handleFail : undefined}
      />

      {/* ── Game Over overlay — matches Losing_screen style exactly ── */}
      {dead && (
        <div className={`losing-popup${closing ? ' losing-popup--closing' : ''}`}>
          <div className='losing-popup__panel'>

            <div className='losing-popup__svg-wrap'>
              <img src={LoseSvg} alt="Game Over" className='losing-popup__svg' />
            </div>

            {/* Round info sits between svg and divider */}
            <div className='endless_popup_stats'>
              <span className='endless_popup_stat'>
                Round <strong>{round}</strong>
              </span>
              <span className='endless_popup_sep'>𓂀</span>
              <span className='endless_popup_stat'>
                Best <strong>{bestRound}</strong>
              </span>
            </div>

            <div className='losing-popup__divider' aria-hidden='true' />

            <button className='losing-popup__btn' onClick={handleRestart}>
              Play Again
            </button>
            <button className='losing-popup__btn' onClick={handleLevels}>
              Levels
            </button>
            <button className='losing-popup__btn losing-popup__btn--home' onClick={handleHome}>
              Home
            </button>

          </div>
        </div>
      )}
    </main>
  );
};

export default Endless_screen;