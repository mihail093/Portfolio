import React, { useRef, useState, useEffect } from 'react';
import { projectService } from '../../services/apiService';
import { motion } from 'framer-motion';
import { Fish } from '../../assets/svg';
import { SpeechBubble, Button, HeroCards } from '../ui';
import { useInView } from 'framer-motion';

export default function Hero({ clicked, setClicked, backClicked, setBackClicked }) {
  // Le const ref e ref2 vengono utilizzate per <motion.div> sfruttando useInView per animare gli elementi figli
  const ref = useRef(null);
  const ref2 = useRef(null);

  const isInView = useInView(ref, {
    once: false,
    amount: 1,
    margin: "160px",
  });
  const isInView2 = useInView(ref2, {
    once: true,
    amount: 1,
  });

  // useState per salvare i progetti in evidenza passiti a HeroCards
  const [featuredProjects, setFeaturedProjects] = useState([]);

  useEffect(() => {
    const fetchFeaturedProjectsData = async () => {
      try {
        const featuredProjectsData = await projectService.getFeaturedProjects();
        if (featuredProjectsData && featuredProjectsData.data && Array.isArray(featuredProjectsData.data)) {
          if (featuredProjectsData.count > 4) {
            setFeaturedProjects(featuredProjectsData.data.slice(0, 4));
          } else {
            setFeaturedProjects(featuredProjectsData.data);
          }
        }
      } catch (error) {
        console.error("Errore nel caricamento dei dati", error);
      }
    };

    fetchFeaturedProjectsData();
  }, []);

  const handleClick = () => {
    setClicked(!clicked);
  }
  const handleBackClick = () => {
    setClicked(!clicked);
    setBackClicked(true);
  }

  return (
    <div className="min-h-screen">
      <div className="relative my-4 h-10 select-none">
        <motion.span
          className="absolute left-0 font-lobster text-4xl"
          initial={{ x: '0vw', opacity: 0 }}
          animate={{ x: '50vw', opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 74,
            damping: 14,
            mass: 1.25,
            delay: 0.3,
          }}
        >
          come!
        </motion.span>

        <motion.span
          className="absolute right-0 font-lobster text-4xl"
          initial={{ x: '0vw', opacity: 0 }}
          animate={{ x: '-50vw', opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 74,
            damping: 14,
            mass: 1.25,
            delay: 0.3,
          }}
        >
          Well
        </motion.span>
      </div>
      <div className="flex justify-center align-center flex-col text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 85 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 85 }}
          transition={{ duration: 1.2 }}
        >
          <div className='select-none'>
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-lobster mb-2">
                I'm Mihajlo, a Full Stack Web Developer
            </h1>
            <p className="text-sm sm:text-lg md:text-xl lg:text-2xl font-montserrat italic mb-8">
                who turns ideas into interactive experiences
            </p>
          </div>
        </motion.div>

        <motion.div
          ref={ref2}
          initial={{ opacity: 0, y: 85 }}
          animate={isInView2 ? {opacity: 1, y: 0 } : { opacity: 0, y: 85 }}
          transition={{ duration: 0.6 }}
        >
          {clicked ? 
          <div className='py-20'>
            <div className='flex justify-center align-center pb-[5.8em]'>
              <HeroCards featuredProjects={featuredProjects} />
            </div>
            <Button handleClick={handleBackClick} label="Back" />
          </div>
          : 
          <div>
            <div className='flex justify-center align-center pt-28 me-12'>
                <Fish />
                <div className='relative'>
                  {backClicked ? 
                  <SpeechBubble>
                    You can see all the projects by clicking on 'Projects' from the menu
                  </SpeechBubble>
                  :
                  <SpeechBubble>
                    Hey there! Click the button below if you want to see some of my projects
                  </SpeechBubble>
                  }
                </div>
            </div>
            <Button handleClick={handleClick} label="Projects" />
          </div>
          }
        </motion.div>
      </div>
    </div>
  )
}