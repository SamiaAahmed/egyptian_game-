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

const Routess = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<Loading_screen />} />
        <Route path="/splash"    element={<Splash_screen />} />
        <Route path="/menu"      element={<Menu_screen />} />
        <Route path="/levels"    element={<Level_screen />} />
        <Route path="/settings"  element={<Setting_screen />} />
        <Route path="/story1"    element={<Intro1 />} />
        <Route path="/story2"
         element={
    <Storytemplate background={Intro1Bg} nextPath="/menu"
      lines={[
        '"In the modern city of Kemet. A city built on top of a kingdom that never fully died.".',
        '"The ancient river still runs"',
        '"Its called ITERU"',
      ]}
      quoteIndex={2}
    />
  }
/>
      </Routes>
    </BrowserRouter>
  );
};

export default Routess;