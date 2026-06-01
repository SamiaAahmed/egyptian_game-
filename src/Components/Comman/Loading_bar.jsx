import React, { useEffect, useRef } from 'react';
import './Loader_bar.css';

const Loader_bar = ({ duration }) => {
    const barRef = useRef(null);

    useEffect(() => {
        if (duration && barRef.current) {
            barRef.current.style.animationDuration = `${duration}s`;
        }
    }, [duration]);

    return (
        <div className='loader_container'>
            <div className='loader_bar' ref={barRef} />
        </div>
    );
}

export default Loader_bar;