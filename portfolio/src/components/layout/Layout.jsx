import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { mediaService } from '../../services/apiService';
import { useTheme } from '../../context/ThemeContext';
import "./Layout.css";

export default function Layout() {
  const HEADER_IMG = "6850715a70324877aa850d0f";
  const HEADER_TEXTURE_IMG = "6850713170324877aa850d0c";

  // useState per salvare le immagini presenti in Header
  const [headerImg, setHeaderImg] = useState([]);
  const [headerTextureImg, setHeaderTextureImg] = useState([]);

  // useEffetc per caricare le immagini
  useEffect(() => {
    const fetchImgData = async () => {
      try {
        const headerImageData = await mediaService.getMediaById(HEADER_IMG);
        const headerTextureImageData = await mediaService.getMediaById(HEADER_TEXTURE_IMG);

        if (headerImageData) {
          setHeaderImg(headerImageData.data);
        }

        if (headerTextureImageData) {
          setHeaderTextureImg(headerTextureImageData.data);
        }
      } catch (error) {
        console.error("Errore nel caricamento immagini HEADER", error);
      }
    };

    fetchImgData();
  }, []);

  const { isDark } = useTheme();

  return (
    <div className="min-h-screen flex flex-col">
      <Header headerImg={headerImg} headerTextureImg={headerTextureImg} />
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
