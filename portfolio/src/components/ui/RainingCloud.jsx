import React from 'react';
import { ImCloud } from "react-icons/im";
import { GiPowerLightning } from "react-icons/gi";
import RainDrop from './RainDrop';
import CloudRain from '../../assets/svg/CloudRain';
import './RainingCloud.css';

export default function RainingCloud({isRaining, setIsRaining}) {

    // Funzione handleClick per gestire l'animazione della pioggia
    const handleClick = (e) => {
        const parentDiv = e.target.closest('.absolute');
        const lightning = parentDiv.querySelector('.lightning-icon');
        setIsRaining(!isRaining);
        lightning.classList.toggle('flash');
    }

    return (
        <div className='absolute top-[4%] left-[25%]' >
            <div className='relative' onClick={handleClick}>
                <CloudRain isRaining={isRaining} />
                <GiPowerLightning
                    className='absolute top-[72%] right-[26%] opacity-0 lightning-icon'
                />
            </div>
            <div className='relative top-[-30%] mx-[20%]'>
                {isRaining && [...Array(50)].map((_, i) => (
                    <RainDrop key={i} />
                ))}
            </div>
        </div>
    )
}