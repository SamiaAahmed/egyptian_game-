import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loading_screen from './Pages/Loading_screen';
import Splash_screen from './Pages/Splash_screen';
import Menu_screen from './Pages/Menu_screen';
import Level_screen from './Pages/Level_screen';
import Setting_screen from './Pages/Setting_screen';
import Story1 from './Pages/Story1_screen';

const Routess = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"        element={<Loading_screen />} />
        <Route path="/splash"  element={<Splash_screen />} />
        <Route path="/menu"    element={<Menu_screen />} />
        <Route path="/levels"  element={<Level_screen />} />
        <Route path="/settings" element={<Setting_screen />} />
        <Route path="/game"    element={<Story1 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routess;