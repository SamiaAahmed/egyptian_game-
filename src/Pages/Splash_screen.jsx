import React, { useRef } from 'react';
import './Loading_screen.css';

import SplashVideo from '../Assets/Images/Splash_screen_video.mp4';
import Game_logo from '../Assets/Images/Itrue_game_logo.svg';
import Divider from '../Assets/Images/Line divider.svg';

const Splash_screen = () => {
    const videoRef = useRef(null);

    return (
        <main>
            <div className='loading_screen_div2'>
                <div className='loading_screen_div1'>
                    <img className='game_logo' src={Game_logo} alt="Game Logo" />

                    <div className='loading_screen_div3'>
                        <h1 className='text1'>The Living Archive</h1>
                        <h3 className='text2'>
                            Where the river remembers what the world forgets
                        </h3>
                    </div>
                </div>

                <div className='splash_screen_div1'>
                    <img className='divider_line' src={Divider} alt="" />
                    <h3 className='text3'>PRESS ANY KEY TO BEGIN</h3>
                    <img className='divider_line2' src={Divider} alt="" />
                </div>
            </div>

            <video className='main_video' ref={videoRef} autoPlay muted>
                <source src={SplashVideo} type="video/mp4" />
            </video>
        </main>
    );
};

export default Splash_screen;