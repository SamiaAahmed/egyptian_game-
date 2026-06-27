import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './Offering_board.css';
// Replace this import with whatever your ancient book image is called
import BookImg from '../../Assets/Images/anceient_book.svg';

const ALL_SQUARES = Array.from({ length: 32 }, (_, i) => i);

const pickRandom = (arr, count) => {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

const Offering_board = ({
  glowCount    = 6,
  mode         = 'show',
  sequence     = [],
  onSequenceDone,
  onSuccess,
  onFail,
  repeatCount  = 2,
  doubtActive  = false,   // Level 3 only — locks input during Doubt Pressure
}) => {
  const glowSequence = useMemo(() => pickRandom(ALL_SQUARES, glowCount), []);

  // ── SHOW MODE state ──
  const [currentStep, setCurrentStep] = useState(-1);
  const [showing,     setShowing]     = useState(true);
  const [loopsDone,   setLoopsDone]   = useState(0);

  // ── INPUT MODE state ──
  const [userStep,  setUserStep]  = useState(0);
  const [correct,   setCorrect]   = useState(new Set());
  const [wrongCell, setWrongCell] = useState(null);
  const [failed,    setFailed]    = useState(false);

  // ── SHOW MODE: auto-advance + repeat ──
  useEffect(() => {
    if (mode !== 'show' || !showing) return;

    if (currentStep === -1) {
      const t = setTimeout(() => setCurrentStep(0), 600);
      return () => clearTimeout(t);
    }

    if (currentStep >= glowSequence.length) {
      const nextLoop = loopsDone + 1;
      if (nextLoop >= repeatCount) {
        setShowing(false);
        if (onSequenceDone) onSequenceDone(glowSequence);
      } else {
        setLoopsDone(nextLoop);
        const t = setTimeout(() => setCurrentStep(0), 600);
        return () => clearTimeout(t);
      }
      return;
    }

    const t = setTimeout(() => setCurrentStep(prev => prev + 1), 1100);
    return () => clearTimeout(t);
  }, [currentStep, showing, mode, loopsDone, glowSequence, repeatCount, onSequenceDone]);

  // ── INPUT MODE: handle click ──
  // If doubtActive is true the board is completely locked — no tap registers.
  const handleCellClick = useCallback((index) => {
    if (mode !== 'input' || failed) return;
    if (sequence.length === 0) return;
    if (doubtActive) return;   // ← Level 3 lock

    const expected = sequence[userStep];

    if (index === expected) {
      const nextCorrect = new Set(correct);
      nextCorrect.add(index);
      setCorrect(nextCorrect);
      const nextStep = userStep + 1;
      setUserStep(nextStep);
      if (nextStep >= sequence.length) {
        setTimeout(() => { if (onSuccess) onSuccess(); }, 400);
      }
    } else {
      setFailed(true);
      setWrongCell(index);
      setTimeout(() => {
        setWrongCell(null);
        if (onFail) onFail();
      }, 600);
    }
  }, [mode, sequence, userStep, correct, onSuccess, onFail, failed, doubtActive]);

  // ── Determine cell class ──
  const getCellClass = (i) => {
    let cls = 'offering-cell';
    if (mode === 'show') {
      const activeGlow = showing && currentStep >= 0 ? (glowSequence[currentStep] ?? null) : null;
      if (i === activeGlow) cls += ' offering-cell--glow';
    } else {
      if (correct.has(i))  cls += ' offering-cell--correct';
      if (i === wrongCell) cls += ' offering-cell--wrong';
      if (i === sequence[userStep] && !correct.has(i) && !failed) cls += ' offering-cell--next';
    }
    return cls;
  };

  return (
    <div className='offering-wrapper'>
      <img className='offering-img' src={BookImg} alt='Ancient offering record' />
      <div className='offering-grid-3'>
        {ALL_SQUARES.map(i => (
          <div
            key={i}
            className={getCellClass(i)}
            onClick={() => handleCellClick(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Offering_board;