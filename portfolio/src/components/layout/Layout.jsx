import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useTheme } from '../../context/ThemeContext';
import "./Layout.css";

export default function Layout() {
  const { isDark } = useTheme();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-grow ${isDark ? 'dark-layout' : 'light-layout'}`}>
        {/*
        Utilizzo segnaposto Outlet per renderizzare dinamicamente i componenti delle rotte figlie all'interno del layout condiviso.
        Questo permette di mantenere elementi comuni come Header e Footer in tutte le pagine, cambiando solo il contenuto centrale
        */}
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
