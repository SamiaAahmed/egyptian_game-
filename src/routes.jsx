import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loading_screen from './Pages/Loading_screen';
import Splash_screen from './Pages/Splash_screen';
import Menu_screen from './Pages/Menu_screen';
import Level_screen from './Pages/Level_screen';
import Setting_screen from './Components/Comman/Setting_screen';
import Intro1 from './Pages/Intro/Intropage1';
import Intro2 from './Pages/Intro/Intropage2';

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
        <Route path="/story2"    element={<Intro2 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routess;