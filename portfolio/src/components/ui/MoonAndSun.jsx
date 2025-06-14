import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import './MoonAndSun.css';

export default function MoonAndSun() {

  const { isDark } = useTheme();

  return (
    <div className={`${isDark ? 'moon' : 'sun'}`}>
    </div>
  )
}
