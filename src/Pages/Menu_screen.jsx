import React, { useRef } from 'react';
import './Menu_screen.css';
import Game_logo from '../Assets/Images/Itrue_game_logo.svg';
import Menu from '../Components/Layout/Menu';

const Menu_screen = () => {
    const videoRef = useRef(null);

    return (
        <main>
            <div className='menu_screen_layout'>
                {/* Left side: Menu navigation */}
                <div className='menu_screen_left'>
                    <Menu />
                </div>

                {/* Right side: Logo + title */}
                <div className='menu_screen_right'>
                    <div className='loading_screen_div1'>
                        <img className='game_logo' src={Game_logo} alt="Game Logo" />
                        <div className='loading_screen_div3'>
                            <h1 className='text1'>The Living Archive</h1>
                            <h3 className='text2'>
                                Where the river remembers what the world forgets
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Menu_screen;