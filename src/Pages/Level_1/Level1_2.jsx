import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Level1_2.css';
import Sound_button from '../../Components/Comman/Sound_button';
import Menu_button from '../../Components/Comman/Menu_button';
import Senet_board from '../../Components/Comman/Senet_board';
import Timer from '../../Components/Comman/Timer';
import Losing_screen from '../Losing_screen';
import Winning_screen from '../Winning_screen';

const Level1_screen2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sequence = location.state?.sequence ?? [];

  const [showLose, setShowLose] = useState(false);
  const [showWin,  setShowWin]  = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [boardKey, setBoardKey] = useState(0);

  const handlePlayAgain = () => {
    setShowLose(false);
    setShowWin(false);
    setTimerKey(prev => prev + 1);
    setBoardKey(prev => prev + 1);
  };

  return (
    <main className='main_level1'>
      <Sound_button />
      <Menu_button />

      <Timer key={timerKey} onTimeUp={() => setShowLose(true)} />

      <Senet_board
        key={boardKey}
        mode="input"
        sequence={sequence}
        onSuccess={() => setShowWin(true)}
        onFail={() => setShowLose(true)}
      />

      {showLose && (
        <Losing_screen
          playAgainPath="/level1_6"
          levelsPath="/levels"
          homePath="/menu"
          onClose={() => setShowLose(false)}
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

export default Level1_screen2;