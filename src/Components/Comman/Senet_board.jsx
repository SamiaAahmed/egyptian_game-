import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './Senet_board.css';
import SenetBoardImg from '../../Assets/Images/senet boared.png';

const ALL_SQUARES = Array.from({ length: 32 }, (_, i) => i);

const pickRandom = (arr, count) => {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

const Senet_board = ({
  glowCount    = 5,
  mode         = 'show',
  sequence     = [],
  onSequenceDone,
  onSuccess,
  onFail,
  repeatCount  = 2,
}) => {
  const glowSequence = useMemo(() => pickRandom(ALL_SQUARES, glowCount), []);

  // ── SHOW MODE state ──
  // -1 means "waiting before first glow"; 0+ means "currently glowing index currentStep"
  const [currentStep, setCurrentStep] = useState(-1);
  const [showing,     setShowing]     = useState(true);
  const [loopsDone,   setLoopsDone]   = useState(0);

  // ── INPUT MODE state ──
  const [userStep,  setUserStep]  = useState(0);
  const [correct,   setCorrect]   = useState(new Set());
  const [wrongCell, setWrongCell] = useState(null);
  const [failed,    setFailed]    = useState(false); // lock board after fail

  // ── SHOW MODE: auto-advance + repeat ──
  useEffect(() => {
    if (mode !== 'show' || !showing) return;

    // -1 = waiting before the first cell lights up
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
  const handleCellClick = useCallback((index) => {
    if (mode !== 'input' || failed) return;
    if (sequence.length === 0) return; // guard: no sequence yet

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
  }, [mode, sequence, userStep, correct, onSuccess, onFail, failed]);

  // ── Determine cell class ──
  const getCellClass = (i) => {
    let cls = 'senet-cell';
    if (mode === 'show') {
      // -1 means we're in the initial delay before the first cell lights up
      const activeGlow = showing && currentStep >= 0 ? (glowSequence[currentStep] ?? null) : null;
      if (i === activeGlow) cls += ' senet-cell--glow';
    } else {
      if (correct.has(i))  cls += ' senet-cell--correct';
      if (i === wrongCell) cls += ' senet-cell--wrong';
      if (i === sequence[userStep] && !correct.has(i) && !failed) cls += ' senet-cell--next';
    }
    return cls;
  };

  return (
    <div className='senet-wrapper'>
      <img className='senet-img' src={SenetBoardImg} alt="Senet Board" />
      <div className='senet-grid'>
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

export default Senet_board;