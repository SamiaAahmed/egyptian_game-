import React, { useState, useEffect } from 'react';
import './textbox.css';

const CHAR_DELAY = 48;
const LINE_PAUSE = 700;
const START_DELAY = 300;

const Textbox = ({
  lines = [],
  quoteIndex = -1,
  continueText = 'Press space to continue',
  onTypingDone,
  startDelay = START_DELAY,
}) => {
  const [displayedLines, setDisplayedLines] = useState(() => lines.map(() => ''));
  const [typingDone, setTypingDone] = useState(false);
  const [clickHint, setClickHint] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timeouts = [];

    const safeTimeout = (fn, delay) => {
      const id = setTimeout(() => {
        if (!cancelled) fn();
      }, delay);
      timeouts.push(id);
      return id;
    };

    safeTimeout(() => setVisible(true), 50);

    let lineIdx = 0;
    let charIdx = 0;

    const tick = () => {
      if (cancelled) return;

      if (lineIdx >= lines.length) {
        setTypingDone(true);
        if (onTypingDone) onTypingDone();
        safeTimeout(() => setClickHint(true), 400);
        return;
      }

      const line = lines[lineIdx];

      if (charIdx <= line.length) {
        const snapshot = line.slice(0, charIdx);
        setDisplayedLines(prev => {
          const next = [...prev];
          next[lineIdx] = snapshot;
          return next;
        });
        charIdx++;
        safeTimeout(tick, CHAR_DELAY);
      } else {
        lineIdx++;
        charIdx = 0;
        safeTimeout(tick, LINE_PAUSE);
      }
    };

    safeTimeout(tick, startDelay);

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [lines, startDelay, onTypingDone]);

  return (
    <div
      className={`story1_textbox${visible ? ' story1_textbox--visible' : ''}`}
      aria-live="polite"
    >
      <div className='story1_textbox_lines'>
        {lines.map((line, idx) => (
          <p
            key={idx}
            className={`story1_line${idx === quoteIndex ? ' story1_line--quote' : ''}`}
          >
            {displayedLines[idx]}

            {!typingDone && displayedLines[idx].length < line.length
              && idx === lines.findIndex((l, i) => displayedLines[i].length < l.length)
              && <span className='story1_cursor'>|</span>}
          </p>
        ))}
      </div>

      <p className={`story1_continue${clickHint ? ' story1_continue--visible' : ''}`}>
        {continueText}
      </p>
    </div>
  );
};

export default Textbox;