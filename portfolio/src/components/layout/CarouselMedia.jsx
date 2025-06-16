import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { ResponsiveCloudinaryImage } from "../ui";

export default function CarouselMedia({ media }) {
  const { isDark } = useTheme();

  // NUOVO: Costante per la durata dell'animazione
  const ANIMATION_DURATION = 400; // ms - valore centralizzato

  // useState per gestire l'animazione sfogliamento Card
  const [cardsIndex, setCardsIndex] = useState({
    hiddenLeftIndex: null,
    leftIndex: null,
    centerIndex: null,
    rightIndex: null,
    hiddenRightIndex: null,
    isDisabled: true,
    canNavigate: false,
  });
  const [isFlippingLeft, setIsFlippingLeft] = useState(false);
  const [isFlippingRight, setIsFlippingRight] = useState(false);

  useEffect(() => {
    const totalImages = media.length;

    if (totalImages <= 3) {
      setCardsIndex({
        hiddenLeftIndex: null,
        leftIndex: totalImages >= 2 ? 0 : null,
        centerIndex: totalImages >= 1 ? (totalImages === 1 ? 0 : 1) : null,
        rightIndex: totalImages === 3 ? 2 : null,
        hiddenRightIndex: null,
        isDisabled: true,
        canNavigate: false,
      });
    } else if (totalImages === 4) {
      setCardsIndex({
        hiddenLeftIndex: 3,
        leftIndex: 0,
        centerIndex: 1,
        rightIndex: 2,
        hiddenRightIndex: 3,
        isDisabled: false,
        canNavigate: true,
      });
    } else {
      setCardsIndex({
        hiddenLeftIndex: totalImages - 1,
        leftIndex: 0,
        centerIndex: 1,
        rightIndex: 2,
        hiddenRightIndex: 3,
        isDisabled: false,
        canNavigate: true,
      });
    }
  }, [media]);

  // MIGLIORATO: Funzione per sfogliare le Card verso sinistra
  const handleLeftClick = () => {
    if (isFlippingLeft || isFlippingRight || !cardsIndex.canNavigate) return;

    setIsFlippingLeft(true);

    // NUOVO: Usa la costante di durata invece di valore hardcodato
    setTimeout(() => {
      setCardsIndex((prevState) => {
        const totalImages = media.length;

        const newCenterIndex = prevState.rightIndex;
        const newLeftIndex = prevState.centerIndex;
        const newHiddenLeftIndex = prevState.leftIndex;
        const newRightIndex = prevState.hiddenRightIndex;
        const newHiddenRightIndex =
          (prevState.hiddenRightIndex + 1) % totalImages;

        return {
          ...prevState,
          hiddenLeftIndex: newHiddenLeftIndex,
          leftIndex: newLeftIndex,
          centerIndex: newCenterIndex,
          rightIndex: newRightIndex,
          hiddenRightIndex: newHiddenRightIndex,
        };
      });

      setIsFlippingLeft(false);
    }, ANIMATION_DURATION);
  };

  // MIGLIORATO: Funzione per sfogliare le Card verso destra
  const handleRightClick = () => {
    if (isFlippingLeft || isFlippingRight || !cardsIndex.canNavigate) return;

    setIsFlippingRight(true);

    // NUOVO: Usa la costante di durata invece di valore hardcodato
    setTimeout(() => {
      setCardsIndex((prevState) => {
        const totalImages = media.length;

        const newCenterIndex = prevState.leftIndex;
        const newRightIndex = prevState.centerIndex;
        const newHiddenRightIndex = prevState.rightIndex;
        const newLeftIndex = prevState.hiddenLeftIndex;
        const newHiddenLeftIndex =
          (prevState.hiddenLeftIndex - 1 + totalImages) % totalImages;

        return {
          ...prevState,
          hiddenLeftIndex: newHiddenLeftIndex,
          leftIndex: newLeftIndex,
          centerIndex: newCenterIndex,
          rightIndex: newRightIndex,
          hiddenRightIndex: newHiddenRightIndex,
        };
      });

      setIsFlippingRight(false);
    }, ANIMATION_DURATION);
  };

  // NUOVO: Configurazione animazione centralizzata
  const animationConfig = {
    duration: ANIMATION_DURATION / 1000, // Framer Motion usa secondi
    ease: "easeInOut", // Tipo di easing più fluido
  };

  const getImageSrc = (index) => {
    return index !== null ? media[index].mediaUrl : null;
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-2 p-2 mt-6 w-full max-w-8xl mx-auto z-10">
      {/* Controllo cambio Card (sinistra) */}
      <div
        className={`
          relative pe-2 py-1 sm:pe-4 sm:py-2 rounded-full z-20 transition-all duration-200
          ${
            isFlippingLeft || isFlippingRight || cardsIndex.isDisabled
              ? "bg-black/40 cursor-not-allowed"
              : "group bg-black cursor-pointer hover:bg-black/80"
          }
        `}
        onClick={handleLeftClick}
      >
        <ChevronLeftIcon
          className={`
            w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 transition-all duration-200 group-hover:scale-110
            ${
              isFlippingLeft || isFlippingRight || cardsIndex.isDisabled
                ? "text-gray-400"
                : "text-cyan-500 group-hover:text-cyan-400"
            }
          `}
        />
        <ChevronLeftIcon
          className={`
            absolute top-[8px] left-[12px] sm:top-[16px] sm:left-[16px] w-6 h-6 sm:w-8 sm:h-8 lg:left-[24px] lg:w-12 lg:h-12 transition-all duration-200 group-hover:scale-110
            ${
              isFlippingLeft || isFlippingRight || cardsIndex.isDisabled
                ? "text-gray-400"
                : "text-cyan-500 group-hover:text-cyan-400"
            }
          `}
        />
      </div>

      <div className="flex justify-center items-center gap-6 w-full h-[420px] px-2">
        {/* Card nascosta sinistra */}
        <motion.div
          initial={{ opacity: 0, rotateX: 0, rotateY: 0, x: -60 }}
          animate={
            isFlippingRight
              ? { 
                  opacity: 1, 
                  rotateX: 25, 
                  rotateY: 45, 
                  x: 120,
                  scaleX: 0.7,
                  scaleY: 0.7
                }
              : { 
                  opacity: 0, 
                  rotateX: 0, 
                  rotateY: 0, 
                  x: -60,
                  scaleX: 0.7,
                  scaleY: 0.7
                }
          }
          transition={isFlippingRight ? animationConfig : { duration: 0 }}
          className="w-1/8 h-1/4"
        >
          <ResponsiveCloudinaryImage
            imageUrl={getImageSrc(cardsIndex.hiddenLeftIndex)}
            className="w-full h-full"
          />
        </motion.div>

        {/* Card sinistra */}
        <motion.div
          initial={{ opacity: 1, rotateX: 25, rotateY: 45, x: 0 }}
          animate={
            isFlippingRight
              ? { 
                  rotateX: 0, 
                  rotateY: 0, 
                  x: 350, 
                  scaleX: 3, 
                  scaleY: 3,
                  opacity: 1
                }
              : isFlippingLeft
              ? { 
                  opacity: 0, 
                  rotateX: 0, 
                  rotateY: 0, 
                  x: -180,
                  scaleX: 0.7,
                  scaleY: 0.7
                }
              : { 
                  opacity: 1, 
                  rotateX: 25, 
                  rotateY: 45, 
                  x: 0,
                  scaleX: 0.7,
                  scaleY: 0.7
                }
          }
          transition={
            isFlippingRight || isFlippingLeft ? animationConfig : { duration: 0 }
          }
          className="w-1/8 h-1/4"
        >
          <ResponsiveCloudinaryImage
            imageUrl={getImageSrc(cardsIndex.leftIndex)}
            className="w-full h-full"
          />
        </motion.div>

        {/* Card centrale */}
        <motion.div
          initial={{ rotateX: 0, rotateY: 0, x: 0, scaleX: 1, scaleY: 1 }}
          animate={
            isFlippingRight
              ? {
                  rotateX: 25,
                  rotateY: -45,
                  x: 370,
                  scaleX: 0.2,
                  scaleY: 0.2,
                }
              : isFlippingLeft
              ? {
                  rotateX: 25,
                  rotateY: 45,
                  x: -370,
                  scaleX: 0.2,
                  scaleY: 0.2,
                }
              : { 
                  rotateX: 0, 
                  rotateY: 0, 
                  x: 0,
                  scaleX: 1,
                  scaleY: 1
                }
          }
          transition={
            isFlippingRight || isFlippingLeft ? animationConfig : { duration: 0 }
          }
          className="w-1/2 h-auto"
        >
          <ResponsiveCloudinaryImage
            imageUrl={getImageSrc(cardsIndex.centerIndex)}
            className="w-full max-h-[400px]"
          />
        </motion.div>

        {/* Card destra */}
        <motion.div
          initial={{ opacity: 1, rotateX: 25, rotateY: -45, x: 0 }}
          animate={
            isFlippingRight
              ? { 
                  opacity: 0, 
                  rotateX: 0, 
                  rotateY: 0, 
                  x: 180,
                  scaleX: 0.7,
                  scaleY: 0.7
                }
              : isFlippingLeft
              ? {
                  rotateX: 0,
                  rotateY: 0,
                  x: -350,
                  scaleX: 3,
                  scaleY: 3,
                  opacity: 1
                }
              : { 
                  opacity: 1, 
                  rotateX: 25, 
                  rotateY: -45, 
                  x: 0,
                  scaleX: 0.7,
                  scaleY: 0.7
                }
          }
          transition={
            isFlippingRight || isFlippingLeft ? animationConfig : { duration: 0 }
          }
          className="w-1/8 h-1/4"
        >
          <ResponsiveCloudinaryImage
            imageUrl={getImageSrc(cardsIndex.rightIndex)}
            className="w-full h-full"
          />
        </motion.div>

        {/* Card nascosta destra */}
        <motion.div
          initial={{ opacity: 0, rotateX: 0, rotateY: 0, x: 60 }}
          animate={
            isFlippingLeft
              ? { 
                  opacity: 1, 
                  rotateX: 25, 
                  rotateY: -45, 
                  x: -120,
                  scaleX: 0.7,
                  scaleY: 0.7
                }
              : { 
                  opacity: 0, 
                  rotateX: 0, 
                  rotateY: 0, 
                  x: 60,
                  scaleX: 0.7,
                  scaleY: 0.7
                }
          }
          transition={isFlippingLeft ? animationConfig : { duration: 0 }}
          className="w-1/8 h-1/4"
        >
          <ResponsiveCloudinaryImage
            imageUrl={getImageSrc(cardsIndex.hiddenRightIndex)}
            className="w-full h-full"
          />
        </motion.div>
      </div>

      {/* Controllo cambio Card (destra) */}
      <div
        className={`
          relative pl-2 py-1 sm:pl-4 sm:py-2 rounded-full mb-4 md:mb-0 z-20 transition-all duration-200
          ${
            isFlippingLeft || isFlippingRight || cardsIndex.isDisabled
              ? "bg-black/40 cursor-not-allowed"
              : "group bg-black cursor-pointer hover:bg-black/80"
          }
        `}
        onClick={handleRightClick}
      >
        <ChevronRightIcon
          className={`
            w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 transition-all duration-200 group-hover:scale-110
            ${
              isFlippingLeft || isFlippingRight || cardsIndex.isDisabled
                ? "text-gray-400"
                : "text-cyan-500 group-hover:text-cyan-400"
            }
          `}
        />
        <ChevronRightIcon
          className={`
            absolute top-[8px] right-[12px] sm:top-[16px] sm:right-[16px] w-6 h-6 sm:w-8 sm:h-8 lg:right-[24px] lg:w-12 lg:h-12 transition-all duration-200 group-hover:scale-110
            ${
              isFlippingLeft || isFlippingRight || cardsIndex.isDisabled
                ? "text-gray-400"
                : "text-cyan-500 group-hover:text-cyan-400"
            }
          `}
        />
      </div>
    </div>
  );
}