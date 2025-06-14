import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { ResponsiveCloudinaryImage } from "../ui";

import capstoneProjectImage from "../../assets/images/capstoneProject.png";
import immagineProva from "../../assets/images/immagineProva.png";
import comingSoon from "../../assets/images/comingSoon.png";
import epiBOOKS from "../../assets/images/epiBOOKS.png";
import headerImg from "../../assets/images/headerImg.png";
import headerTexture from "../../assets/images/headerTexture.jpg";

export default function CarouselMedia() {
  const { isDark } = useTheme();

  const imagesArray = [
    capstoneProjectImage,
    immagineProva,
    comingSoon,
    epiBOOKS,
    headerImg,
    headerTexture,
  ];

  // useState per salvare i media
  const [mediaData, setMediaData] = useState([]);

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
    const totalImages = imagesArray.length;

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
      // Con 5 o più immagini
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
  }, []);

  // Funzione per sfogliare le Card verso sinistra
  const handleLeftClick = () => {
    if (isFlippingLeft || !cardsIndex.canNavigate) return;

    setIsFlippingLeft(true);

    setTimeout(() => {
      setCardsIndex((prevState) => {
        const totalImages = imagesArray.length;

        // Calcola i nuovi indici sfogliando verso destra
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
    }, 300);
  };

  // Funzione per sfogliare le Card verso destra
  const handleRightClick = () => {
    if (isFlippingRight || !cardsIndex.canNavigate) return;

    setIsFlippingRight(true);

    setTimeout(() => {
      setCardsIndex((prevState) => {
        const totalImages = imagesArray.length;

        // Calcola i nuovi indici sfogliando verso sinistra
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
    }, 300);
  };

  // Funzione helper per gestire immagini null
  const getImageSrc = (index) => {
    return index !== null ? imagesArray[index] : null;
  };

  return (
    <div
      className={`
          flex flex-col md:flex-row justify-center items-center gap-2
          p-2 mt-6 w-full max-w-8xl mx-auto z-10
        `}
    >
      {/* Controllo cambio Card (sinistra) */}
      <div
        className={`
          relative pe-2 py-1 sm:pe-4 sm:py-2 rounded-full z-20
          ${
            isFlippingLeft || isFlippingRight || cardsIndex.isDisabled
              ? "bg-black/40 cursor-not-allowed"
              : "group bg-black cursor-pointer"
          }
        `}
        onClick={handleLeftClick}
      >
        <ChevronLeftIcon
          className={`
            w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 transition-transform duration-200 group-hover:scale-125
            ${
              isFlippingLeft || isFlippingRight || cardsIndex.isDisabled
                ? "text-gray-400"
                : "text-cyan-500"
            }
          `}
          aria-hidden="true"
        />
        <ChevronLeftIcon
          className={`
            absolute top-[8px] left-[12px] sm:top-[16px] sm:left-[16px] w-6 h-6 sm:w-8 sm:h-8 lg:left-[24px] lg:w-12 lg:h-12 transition-transform duration-200 group-hover:scale-125
            ${
              isFlippingLeft || isFlippingRight || cardsIndex.isDisabled
                ? "text-gray-400"
                : "text-cyan-500"
            }
          `}
          aria-hidden="true"
        />
      </div>

      <div
        className="
            flex justify-center items-center gap-6 
            w-full h-[420px] px-2
        "
      >
        <motion.div
          initial={{ opacity: 0, rotateX: 0, rotateY: 0, x: -40 }}
          animate={
            isFlippingRight
              ? { opacity: 1, rotateX: 32, rotateY: 32, x: 170 }
              : { opacity: 0, rotateX: 0, rotateY: 0, x: -40 }
          }
          transition={isFlippingRight ? { duration: 0.3 } : { duration: 0 }}
          className="w-1/8 h-1/4"
        >
          <ResponsiveCloudinaryImage
            imageUrl={getImageSrc(cardsIndex.hiddenLeftIndex)}
            className="w-full h-full"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 1, rotateX: 32, rotateY: 32, x: 0 }}
          animate={
            isFlippingRight
              ? { rotateX: 0, rotateY: 0, x: 392, scaleX: 4.062, scaleY: 3.782 }
              : isFlippingLeft
              ? { opacity: 0, rotateX: 0, rotateY: 0, x: -210 }
              : { opacity: 1, rotateX: 32, rotateY: 32, x: 0 }
          }
          transition={
            isFlippingRight || isFlippingLeft
              ? { duration: 0.3 }
              : { duration: 0 }
          }
          className="w-1/8 h-1/4"
        >
          <ResponsiveCloudinaryImage
            imageUrl={getImageSrc(cardsIndex.leftIndex)}
            className="w-full h-full"
          />
        </motion.div>

        <motion.div
          initial={{ rotateX: 0, rotateY: 0, x: 0 }}
          animate={
            isFlippingRight
              ? {
                  rotateX: 32,
                  rotateY: 32,
                  x: 392,
                  scaleX: 0.246,
                  scaleY: 0.264,
                }
              : isFlippingLeft
              ? {
                  rotateX: 32,
                  rotateY: 32,
                  x: -392,
                  scaleX: 0.246,
                  scaleY: 0.264,
                }
              : { rotateX: 0, rotateY: 0, x: 0 }
          }
          transition={
            isFlippingRight || isFlippingLeft
              ? { duration: 0.3 }
              : { duration: 0 }
          }
          className="w-1/2 h-auto"
        >
          <ResponsiveCloudinaryImage
            imageUrl={getImageSrc(cardsIndex.centerIndex)}
            className="w-full max-h-[400px]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 1, rotateX: 32, rotateY: 32, x: 0 }}
          animate={
            isFlippingRight
              ? { opacity: 0, rotateX: 0, rotateY: 0, x: 210 }
              : isFlippingLeft
              ? {
                  rotateX: 0,
                  rotateY: 0,
                  x: -392,
                  scaleX: 4.062,
                  scaleY: 3.782,
                }
              : { opacity: 1, rotateX: 32, rotateY: 32, x: 0 }
          }
          transition={
            isFlippingRight || isFlippingLeft
              ? { duration: 0.3 }
              : { duration: 0 }
          }
          className="w-1/8 h-1/4"
        >
          <ResponsiveCloudinaryImage
            imageUrl={getImageSrc(cardsIndex.rightIndex)}
            className="w-full h-full"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, rotateX: 0, rotateY: 0, x: 40 }}
          animate={
            isFlippingLeft
              ? { opacity: 1, rotateX: 32, rotateY: 32, x: -170 }
              : { opacity: 0, rotateX: 0, rotateY: 0, x: 40 }
          }
          transition={isFlippingLeft ? { duration: 0.3 } : { duration: 0 }}
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
        relative pl-2 py-1 sm:pl-4 sm:py-2 rounded-full mb-4 md:mb-0 z-20
        ${
          isFlippingLeft || isFlippingRight || cardsIndex.isDisabled
            ? "bg-black/40 cursor-not-allowed"
            : "group bg-black cursor-pointer"
        }
      `}
        onClick={handleRightClick}
      >
        <ChevronRightIcon
          className={`
          w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 transition-transform duration-200 group-hover:scale-125
          ${
            isFlippingLeft || isFlippingRight || cardsIndex.isDisabled
              ? "text-gray-400"
              : "text-cyan-500"
          }
        `}
          aria-hidden="true"
        />
        <ChevronRightIcon
          className={`
          absolute top-[8px] right-[12px] sm:top-[16px] sm:right-[16px] w-6 h-6 sm:w-8 sm:h-8 lg:right-[24px] lg:w-12 lg:h-12 transition-transform duration-200 group-hover:scale-125
          ${
            isFlippingLeft || isFlippingRight || cardsIndex.isDisabled
              ? "text-gray-400"
              : "text-cyan-500"
          }
        `}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}