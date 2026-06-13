import React, { useState, useEffect, useRef, useCallback } from 'react';
import './textbox.css';


const Textbox = ( props ) => {
  const [showSettings, setShowSettings] = useState(false);

  return (
<div
        className={`story1_textbox${textBoxVisible ? ' story1_textbox--visible' : ''}`}
        aria-live="polite"
      >
        <div className='story1_textbox_lines'>
          {LINES.map((_, idx) => (
            <p
              key={idx}
              className={`story1_line${idx === 2 ? ' story1_line--quote' : ''}`}
            >
              {displayedLines[idx]}

              {!typingDone && displayedLines[idx].length < LINES[idx].length
                && idx === LINES.findIndex((l, i) => displayedLines[i].length < l.length)
                && <span className='story1_cursor'>|</span>}
            </p>
          ))}
        </div>

        <p className={`story1_continue${clickHint ? ' story1_continue--visible' : ''}`}>
          Click anywhere to continue
        </p>
    </main>
  );
};

export default Textbox ;