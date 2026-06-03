import React from 'react';
import './Loading_bar.css';

const Loader_bar = ({ duration = 5, onComplete }) => {
  return (
    <div
      className="loader_container"
      style={{ '--loader-duration': `${duration}s` }}
    >
      <div
        className="loader_bar"
        onAnimationEnd={onComplete}
      />
    </div>
  );
};

export default Loader_bar;