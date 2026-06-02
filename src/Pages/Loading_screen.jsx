import React, { useRef, useEffect, useState } from 'react';
import './Loading_screen.css';
import Splash_screen from '../Assets/Images/Splash_screen_video.mp4';
import Game_logo from '../Assets/Images/Itrue_game_logo.svg';
import Loader_bar from '../Components/Comman/Loading_bar';

const Loading_screen = () => {
    const videoRef = useRef(null);
    const [duration, setDuration] = useState(null);

    useEffect(() => {
        const video = videoRef.current;

        const onLoadedMetadata = () => {
            setDuration(video.duration);
        };

        video.addEventListener('loadedmetadata', onLoadedMetadata);
        return () => video.removeEventListener('loadedmetadata', onLoadedMetadata);
    }, []);

    return ( 
        <>
        <main>
            <div className='loading_screen_div2'>
                <div className='loading_screen_div1'>
                    <img className='game_logo' src={Game_logo} alt="" />
                    <div className='loading_screen_div3'>
                        <h1 className='text1'>The Living Archive</h1>
                        <h3 className='text2'>Where the river remembers what  the world forgets</h3>
                    </div>
                </div>
                <Loader_bar duration={duration} />
            </div>
            <video className='main_video' ref={videoRef} autoPlay muted>
                <source src={Splash_screen} type="video/mp4"/>
            </video>
        </main>
        </>
     );
}
 
export default Loading_screen;