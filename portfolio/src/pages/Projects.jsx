import React, { useState, useEffect } from 'react';
import { projectService } from '../services/apiService';
import { useTheme } from '../context/ThemeContext';
import { FishSwimming, FishSleeping, Lantern } from '../assets/svg';
import { MoonAndSun, RainingCloud, Alert } from '../components/ui';
import Card from '../components/layout/Card';
import { ImCloud } from "react-icons/im";

export default function Projects() {
  const { isDark } = useTheme();
  
  // useState per il salvataggio dei dati
  const [cardsData, setCardsData] = useState([]); // usato per salvare i dati dei progetti

  // useState per la gestione di alcune animazioni
  const [isRaining, setIsRaining] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // useState per gestire l'errore di caricamento
  const [errorLoad, setErrorLoad] = useState(false);

  // useEffect per il caricamento dei progetti
  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const projectsData = await projectService.getProjects();
        if (
          projectsData &&
          projectsData.data &&
          Array.isArray(projectsData.data)
        ) {
          // Aggiorna tutti gli stati
          const newCards = projectsData.data.map((item, index) => ({
            title: item.title,
            imageUrl: item.imageUrl,
            projectIndex: index,
            visual: false,
            allProjectData: item,
          }));

          setCardsData(newCards);
          setErrorLoad(false);
        } 
      } catch (error) {
        console.error("Errore nel caricamento dei dati", error);
        setErrorLoad(true);
      }
    };

    fetchProjectsData();
  }, []);

  // useEffect reimposta isRainig e isClicked entrambi a 'false'
  useEffect(() => {
    setIsRaining(false);
    setIsClicked(false);
  }, [isDark]);

  // funzione cardHandleCloseButton per gestire la chiusura della <Card>
  const cardHandleCloseButton = (card) => {
    setCardsData(prev => prev.map(p => 
      p.title === card.title ? { ...p, visual: false } : p
    ));
  };

  return (
    <div className='relative h-screen overflow-hidden'>
      {/* Layer 1: Background con il pesce */}
      <div className='absolute inset-0'>
        {isDark ? 
          <FishSleeping isRaining={isRaining} errorLoad={errorLoad} /> : 
          <FishSwimming isClicked={isClicked} errorLoad={errorLoad} />
        }
      </div>

      {/* Layer 2: UI Elements */}
      <div className='relative h-full'>
        {/* MoonAndSun e Cloud */}
        <div className='relative z-10'>
          <MoonAndSun />
          {!isDark && <ImCloud size="100" className='absolute top-[4%] text-white left-[14%]' />}
        </div>

        {/* Layer 3: RainingCloud */}
        <div className='relative z-30'>
          {isDark && <RainingCloud isRaining={isRaining} setIsRaining={setIsRaining} />}
        </div>

        {/* Layer 4: Cards */}
        <div className='relative z-40 flex justify-center items-bottom'>
          {cardsData.map((item) => (
            item.visual && 
              <Card
                key={item.projectIndex}
                title={item.title} 
                image={item.imageUrl}
                allProjectData={item.allProjectData}
                handleCloseButton={() => cardHandleCloseButton(item)}
              />
          ))}
        </div>

        {/* Layer 5: Lanterne */}
        <div className='absolute top-1/3 w-full z-20'>
          <div className='flex justify-around align-center border-t-2 border-[#B2181A]'>
            {cardsData.map((item) => (
              <div
                key={item.projectIndex} 
                className='w-full w-[12.5%] md:w-[10%] lg:w-[8%]'
              >
                <Lantern 
                  onClick={() => {
                    setCardsData(prev => prev.map((p, index) => 
                      index === item.projectIndex ? {...p, visual: true} : {...p, visual: false}
                    )); 
                    setIsClicked(true);
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Layer 6: Alert */}
        <div className='relative z-50'>
          {isDark && <Alert label='Click the cloud to make it rain and wake up Joe' />}
        </div>
      </div>
    </div>
  );
}