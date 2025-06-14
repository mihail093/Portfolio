import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { easeInOut, motion } from 'framer-motion';
import { HomeIcon, BookOpenIcon, InformationCircleIcon, AtSymbolIcon } from "@heroicons/react/20/solid";
import headerImg from "../../assets/images/headerImg.png";
import headerTexture from "../../assets/images/headerTexture.jpg";
import { useTheme } from '../../context/ThemeContext';
import "./Header.css";

export default function Header() {
    // Ottiene l'oggetto location dall'hook useLocation per accedere al pathname corrente
    const location = useLocation();

    // Estrae le variabili isDark e toggleTheme dal contesto del tema
    const { isDark, toggleTheme } = useTheme();

    // Funzione per calcolare la rotazione in base al pathname
    const calculateRotation = (pathname) => {
        const rotationMap = {
            '/': 0,
            '/projects': 90,
            '/about': 180,
            '/contact': 270
        };
        return rotationMap[pathname] || 0;
    };

    // Inizializza la rotazione basandosi sull'URL corrente
    const [rotation, setRotation] = useState(calculateRotation(location.pathname));

    // Aggiorna la rotazione quando cambia l'URL
    useEffect(() => {
        setRotation(calculateRotation(location.pathname));
    }, [location.pathname]);

    // Definisco gli elementi della navigazione
    const navItems = useMemo(() => [
        { name: 'Home', Icon: HomeIcon, angle: 0 },
        { name: 'Projects', Icon: BookOpenIcon, angle: 90 },
        { name: 'About', Icon: InformationCircleIcon, angle: 180 },
        { name: 'Contact', Icon: AtSymbolIcon, angle: 270 }
    ], []);

    return (
        <div className={`flex items-center justify-center min-h-[64vh] p-4 ${isDark ? 'dark-mode' : 'light-mode'}`}>
            <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]">
                <div className="absolute inset-0">
                    <motion.svg 
                        className="w-full h-full" 
                        viewBox="0 0 400 400"
                        initial={{ rotate: calculateRotation(location.pathname) }}
                        animate={{ rotate: rotation }}
                        transition={{ duration: 1, ease: easeInOut }}
                    >
                        <defs>
                            <pattern
                                id="outerPattern"
                                patternUnits="userSpaceOnUse"
                                width="380"    // Diametro del cerchio esterno (r * 2)
                                height="380"
                                x="10"        // Centrato: (400 - 380) / 2
                                y="10"
                            >
                                <image
                                    href={headerTexture}
                                    width="380"
                                    height="380"
                                    preserveAspectRatio="xMidYMid slice"
                                />
                            </pattern>

                            {/* Gradiente radiale per l'effetto sferico */}
                            <radialGradient id="sphereGradient">
                                <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
                                <stop offset="50%" stopColor="rgba(255,255,255,0)" />
                                <stop offset="90%" stopColor="rgba(0,0,0,0.3)" />
                                <stop offset="100%" stopColor="rgba(0,0,0,0.5)" />
                            </radialGradient>

                            {/* Vignettatura */}
                            <radialGradient id="vignetteOverlay">
                                <stop offset="0%" stopColor="rgba(218,164,98,0)" />
                                <stop offset="70%" stopColor="rgba(60,47,27,0.2)" />
                                <stop offset="90%" stopColor="rgba(60,47,27,0.4)" />
                                <stop offset="100%" stopColor="rgba(60,47,27,0.6)" />
                            </radialGradient>

                            {/* Filtro per l'ombra esterna */}
                            <filter id="sphereShadow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
                                <feOffset dx="2" dy="4" />
                                <feComponentTransfer>
                                    <feFuncA type="linear" slope="0.3" />
                                </feComponentTransfer>
                                <feMerge>
                                    <feMergeNode />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                        {/* Cerchio esterno con effetti 3D */}
                        <g filter="url(#sphereShadow)">
                            {/* Base texture */}
                            <circle
                                cx="200"
                                cy="200"
                                r="190"
                                fill="url(#outerPattern)"
                            />
                            
                            {/* Overlay sferico */}
                            <circle
                                cx="200"
                                cy="200"
                                r="190"
                                fill="url(#sphereGradient)"
                                style={{ mixBlendMode: 'overlay' }}
                            />
                            
                            {/* Vignettatura */}
                            <circle
                                cx="200"
                                cy="200"
                                r="190"
                                fill="url(#vignetteOverlay)"
                                style={{ mixBlendMode: 'multiply' }}
                            />
                        </g>
                        {/* Navigazione */}
                        <g>
                            {navItems.map(({ name, Icon, angle }) => {
                                const isActive = 
                                    (name === 'Home' && location.pathname === '/') || 
                                    location.pathname === `/${name.toLowerCase()}`;

                                return (
                                    <g key={name} transform={`rotate(${angle} 200 200)`}>
                                        <Link to={name === 'Home' ? '/' : `/${name.toLowerCase()}`}>
                                            {/* Applichiamo una contro-rotazione per mantenere gli elementi leggibili */}
                                            <g transform={`rotate(-${angle + rotation} 200 45)`}>
                                                {/* Contenitore per icona/testo */}
                                                <g transform="translate(196, 45)">
                                                    {isActive ? (
                                                        <g>
                                                            {/* Testo */}
                                                            <motion.text
                                                                initial={{ opacity: 0, scale: 0.3 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                transition={{ duration: 0.6 }}
                                                                textAnchor="middle"
                                                                dominantBaseline="middle"
                                                                className='header-text'
                                                            >
                                                                {name}
                                                            </motion.text>
                                                        </g>
                                                    ) : (
                                                        <motion.g
                                                            initial={{ opacity: 0, scale: 0.4 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ duration: 0.5 }}
                                                        >
                                                            <svg 
                                                                viewBox="0 0 40 40"
                                                                width="38"
                                                                height="38"
                                                                color="#e29191"
                                                                x="-16"
                                                                y="-14"
                                                                className="cursor-pointer transition-transform duration-400 hover:scale-110"
                                                            >
                                                                <circle
                                                                    cx="20"
                                                                    cy="20"
                                                                    r="19"
                                                                    fill='#484e4c'
                                                                    stroke='#1f2222'
                                                                    strokeWidth='3'
                                                                />
                                                                <Icon />
                                                            </svg>
                                                        </motion.g>
                                                    )}
                                                </g>
                                            </g>
                                        </Link>
                                    </g>
                                );
                            })}
                        </g>
                    </motion.svg>
                </div>
                
                {/*Bottone cambio tema light/dark */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-10">
                    <input id="checkbox" type="checkbox" className="hidden" checked={isDark} onChange={toggleTheme} />
                    <label className="switch" htmlFor="checkbox">
                        <div className="powersign"></div>
                    </label>
                </div>

                {/* Cerchio interno*/}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.8, ease: easeInOut }}
                >
                    <svg className="w-2/3 h-2/3" viewBox="0 0 200 200">
                        <defs>
                            <pattern
                                id="imagePattern"
                                patternUnits="userSpaceOnUse"
                                width="160"    // Diametro del cerchio interno (r * 2)
                                height="160"
                                x="20"        // Centrato: (200 - 160) / 2
                                y="20"
                            >
                                <image
                                    href={headerImg}
                                    width="160"
                                    height="160"
                                    preserveAspectRatio="xMidYMid slice"
                                />
                            </pattern>
                        </defs>

                        {/* Cerchio interno */}
                        <circle
                            cx="100"
                            cy="100"
                            r="80"
                            fill="url(#imagePattern)"
                        />
                    </svg>
                </motion.div>
            </div>
        </div>
    );
}