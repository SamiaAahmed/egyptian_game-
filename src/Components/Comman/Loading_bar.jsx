import React, { useEffect, useRef } from 'react';
import './Loading_bar.css';

const Loader_bar = ({ duration = 5, onComplete }) => {
  const barRef = useRef(null);

  useEffect(() => {
    if (barRef.current) {
      barRef.current.style.animationDuration = `${duration}s`;
    }
  }, [duration]);

  return (
    <div className="loader_container">
      <div
        className="loader_bar"
        ref={barRef}
        onAnimationEnd={onComplete}
      ></div>
    </div>
  );
};

export default Loader_bar;