import React from 'react';
import './Loading_screen.css';
import Splash_screen from '../Assets/Images/Splash_screen_video.mp4';

const Loading_screen = () => {
    return ( 
        <>
       <video className='main_video' autoPlay muted >
            <source src={Splash_screen} type="video/mp4"/>
        </video>
        </>
     );
}
 
export default Loading_screen;
