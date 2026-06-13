import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loading_screen from './Pages/Loading_screen';
import Splash_screen from './Pages/Splash_screen';
import Menu_screen from './Pages/Menu_screen';
import Level_screen from './Pages/Level_screen';
import Setting_screen from './Components/Comman/Setting_screen';
import Intro1 from './Pages/Intro/Intropage1';
import Storytemplate from './Components/Layout/Storytemplate';
import Intro1Bg from './Assets/Images/intro1.jpg';
import Intro2Bg from './Assets/Images/intro2.jpg';
import Intro3Bg from './Assets/Images/intro3.jpg';
import Intro4Bg from './Assets/Images/intro4.jpg';
import Intro5Bg from './Assets/Images/intro5.jpg';
import Level1Bg1 from './Assets/Images/level1_1.jpg';
import Level1Bg2 from './Assets/Images/level1_2.jpg';
import Level1Bg3 from './Assets/Images/level1_3.jpg';
import Level1Bg5 from './Assets/Images/level1_5.jpg';

const Routess = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Main screens  */}

        <Route path="/"          element={<Loading_screen />} />
        <Route path="/splash"    element={<Splash_screen />} />
        <Route path="/menu"      element={<Menu_screen />} />
        <Route path="/levels"    element={<Level_screen />} />
        <Route path="/settings"  element={<Setting_screen />} />

        {/* Intro */}

        <Route path="/story1"    element={<Intro1 />} />
        <Route path="/story2"
         element={
    <Storytemplate background={Intro1Bg} nextPath="/story3"
      lines={[
        '"In the modern city of Kemet. A city built on top of a kingdom that never fully died.".',
        '"The ancient river still runs"',
        '"Its called ITERU"',
      ]}
      quoteIndex={2}
    />
  }
/> 
        <Route path="/story3"
         element={
    <Storytemplate background={Intro2Bg} nextPath="/Story4"
      lines={[
        '"Iteru. Not just a river. A living archive."',
        '"Every soul that ever drowned in it, prayed to it, or died beside it left a story in its current."',
        '"Some of those stories never ended right.They loop,And the loop makes the water sick."',
        '"And when the water is sick the world above cracks."',
      ]}
      quoteIndex={3}
    />
  }
/>
        <Route path="/story4"
         element={
    <Storytemplate background={Intro3Bg} nextPath="/Story5"
      lines={[
        '"This is Nebet."',
        '"She was born at the exact moment Iteru last overflowed. She and the river share a heartbeat"',
        '"The river has known her name since before she had one. It has been waiting."',
      ]}
      quoteIndex={2}
    />
  }
/>
        <Route path="/story5"
         element={
    <Storytemplate background={Intro4Bg} nextPath="/Story6"
      lines={[
        '"She cannot swim. She has never been able to."',
        '"When she enters the water, she does not drown."',
        '"She sinks into memory."',
      ]}
      quoteIndex={2}
    />
  }
/>
        <Route path="/story6"
         element={
    <Storytemplate background={Intro5Bg} nextPath="/levels"
      lines={[
        '"The water is rising and the ITERU is calling her."',
        '"She does not know yet that she was chosen the moment she took her first breath. She only knows that the water is calling."',
        '"Will she answer it ??"',
      ]}
      quoteIndex={2}
    />
  }
/>
       {/* Level 1 */}

        <Route path="/game"
         element={
    <Storytemplate background={Level1Bg1} nextPath="/level1_1"
      lines={[
        '"Nebet is pulled more under without warning diving deeper and deeper."',
        '"She is being controlled by the river but somehow she feels safe "',
        '"Her vision started to become blurry and she saw visions."',
      ]}
      quoteIndex={2}
    />
  }
/>
        <Route path="/level1_1"
         element={
    <Storytemplate background={Level1Bg2} nextPath="/level1_2"
      lines={[
        `"In 650 BCE there was a father accused of theft against the temple under the
 disgrace of here fathers act.  She was registered at birth under a placeholder: Daughter of
the Accused."`,
      ]}
      quoteIndex={0}
    />
  }
/>
        <Route path="/level1_2"
         element={
    <Storytemplate background={Level1Bg3} nextPath="/level1_3"
      lines={[
        `Her mother, before dying whispered her real name to her once a name, chosen with love, never spoken again. The child lived to adulthood being called the wrong name.`,
      ]}
      quoteIndex={0}
    />
  }
/>
      </Routes>
    </BrowserRouter>
  );
};

export default Routess;