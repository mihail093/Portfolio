// ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Creazione del context
const ThemeContext = createContext();

// Custom hook per utilizzare il theme
export const useTheme = () => {
    const context = useContext(ThemeContext);
    return context;
};

// Provider component
export const ThemeProvider = ({ children }) => {
    // Controlla se c'è una preferenza salvata nel localStorage
    const [isDark, setIsDark] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme 
            ? savedTheme === 'dark' 
            : window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    // Aggiorna il localStorage quando cambia il tema
    useEffect(() => {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        // Aggiorna le classi del documento
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark(prev => !prev);
    };

    const value = {
        isDark,
        toggleTheme
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};