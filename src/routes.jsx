import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Loading_screen from './Pages/Loading_screen';


const Routess = () => {
    return ( 
    
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Loading_screen/>}/>
    </Routes>
    </BrowserRouter>
        
     );
}
 
export default Routess;