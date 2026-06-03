import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Loading_screen.css';
import Splash_screen_video from '../Assets/Images/Splash_screen_video.mp4';
import Game_logo from '../Assets/Images/Itrue_game_logo.svg';
import Loader_bar from '../Components/Comman/Loading_bar';

const Loading_screen = () => {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [duration, setDuration] = useState(5);

  useEffect(() => {
    const video = videoRef.current;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    if (video) {
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    return () => {
      if (video) {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      }
    };
  }, []);

  // Navigate immediately when the loading bar animation finishes
  const handleLoadingComplete = () => {
    navigate('/splash');
  };

  return (
    <main>
      <div className="loading_screen_div2">
        <div className="loading_screen_div1">
          <img
            className="game_logo"
            src={Game_logo}
            alt="Game Logo"
          />

          <div className="loading_screen_div3">
            <h1 className="text1">The Living Archive</h1>
            <h3 className="text2">
              Where the river remembers what the world forgets
            </h3>
          </div>
        </div>

        <Loader_bar
          duration={duration}
          onComplete={handleLoadingComplete}
        />
      </div>

      <video
        className="main_video"
        ref={videoRef}
        autoPlay
        muted
      >
        <source
          src={Splash_screen_video}
          type="video/mp4"
        />
      </video>
    </main>
  );
};

export default Loading_screen;