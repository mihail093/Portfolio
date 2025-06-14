import React from 'react';
import { ImCloud } from "react-icons/im";
import { GiPowerLightning } from "react-icons/gi";
import RainDrop from './RainDrop';
import './RainingCloud.css';

export default function RainingCloud({isRaining, setIsRaining}) {

    // Funzione handleClick per gestire l'animazione della pioggia
    const handleClick = (e) => {
        e.target.classList.toggle('rain');
        const parentDiv = e.target.closest('.absolute');
        const lightning = parentDiv.querySelector('.lightning-icon');
        setIsRaining(!isRaining);
        lightning.classList.toggle('flash');
    }

    return (
        <div className='absolute top-[4%] left-[25%]' >
            <div className='relative'>
                <ImCloud 
                    size="180"
                    className='text-[#1e0a34] cloud-icon'
                    onClick={handleClick}
                />
                <GiPowerLightning
                    size="90"
                    className='absolute top-[78%] right-[26%] opacity-0 lightning-icon'
                />
            </div>
            <div className='relative top-[-30%] drop-container'>
                {isRaining && [...Array(50)].map((_, i) => (
                    <RainDrop key={i} />
                ))}
            </div>
        </div>
    )
}