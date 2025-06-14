import React, { useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import "./AdminProjectsComponent.css";

export default function AdminProjectsComponent({ pages, onProjectSelect }) {
  // useState per gestire cambio colore delle icone
  const [leftIconActive, setLeftIconActive] = useState(false);
  const [leftSmallIconActive, setLeftSmallIconActive] = useState(false);
  const [rightIconActive, setRightIconActive] = useState(false);
  const [rightSmallIconActive, setRightSmallIconActive] = useState(false);

  // useState utilizzati per l'animazione cambio pagina
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState(null);
  const [pageShadowOpacity, setPageShadowOpacity] = useState(0);
  const [pageCurvature, setPageCurvature] = useState(0);
  const [isRotated, setIsRotated] = useState(false);
  const [currentFlipBgImage, setCurrentFlipBgImage] = useState("");

  // Ref per il contenitore
  const containerRef = useRef(null);

  // Animazione controllata per una pagina che si sta sfogliando
  const pageControls = useAnimation();

  // Funzione per gestire il click su una pagina
  const handlePageClick = (pageIndex) => {
    if (onProjectSelect && pages[pageIndex]) {
      onProjectSelect(pageIndex);
    }
  };

  // Funzione per gestire l'animazione cambio pagina
  const animatePageTurn = async (direction) => {
    if (isFlipping) return;

    setIsFlipping(true);
    setFlipDirection(direction);

    // Imposta l'immagine di copertina iniziale della pagina che si sta girando
    if (direction === "right") {
      setCurrentFlipBgImage(pages[rightPage]?.imageUrl);
    } else {
      setCurrentFlipBgImage(pages[leftPage]?.imageUrl);
    }

    // Sequenza di animazione
    if (direction === "right") {
      // La pagina inizia a girare
      await pageControls.start({
        rotateY: 45,
        transition: { duration: 0.7, ease: "easeOut" },
      });

      // Aumenta la curvatura mentre la pagina gira
      setPageCurvature(10);
      setPageShadowOpacity(0.5);

      // La pagina continua a girare
      await pageControls.start({
        rotateY: 90,
        transition: { duration: 0.5, ease: "linear" },
      });

      setIsRotated(true);
      setCurrentFlipBgImage(pages[rightPage + 1]?.imageUrl);

      // Fase finale del flip
      await pageControls.start({
        rotateY: 180,
        transition: { duration: 0.2, ease: "easeIn" },
      });

      // Aggiorna la pagina corrente
      setCurrentPage((prev) => prev + 2);
    } else if (direction === "left") {
      // Animazione per sfogliare indietro
      await pageControls.start({
        rotateY: -45,
        transition: { duration: 0.7, ease: "easeOut" },
      });

      // Aumenta la curvatura mentre la pagina gira
      setPageCurvature(-10);
      setPageShadowOpacity(0.5);

      // La pagina continua a girare
      await pageControls.start({
        rotateY: -90,
        transition: { duration: 0.5, ease: "linear" },
      });

      setIsRotated(true);
      setCurrentFlipBgImage(pages[leftPage - 1]?.imageUrl);

      // Fase finale
      await pageControls.start({
        rotateY: -180,
        transition: { duration: 0.2, ease: "easeIn" },
      });

      // Aggiorna la pagina corrente
      setCurrentPage((prev) => prev - 2);
    }

    // Resetta gli stati
    setPageCurvature(0);
    setPageShadowOpacity(0);
    setIsFlipping(false);
    setIsRotated(false);
    pageControls.set({ rotateY: 0 });
  };

  // Calcola quale pagina viene visualizzata a sinistra e destra
  const leftPage = currentPage;
  const rightPage = currentPage + 1;

  // Calcola anche la pagina successiva o precedente che verrà rivelata
  const nextLeftPage =
    flipDirection === "right" ? currentPage + 2 : currentPage - 2;
  const nextRightPage =
    flipDirection === "right" ? currentPage + 3 : currentPage - 1;
  const isNextRightPageValid =
    nextRightPage >= 0 && nextRightPage < pages.length;
  const nextRightImage = isNextRightPageValid
    ? pages[nextRightPage]?.imageUrl
    : null;

  // Funzione per sfogliare pagina indietro e cambiare il colore delle icone ChevronLeftIcon
  const handleLeftClick = () => {
    if (isFlipping || currentPage <= 0) return;
    setLeftSmallIconActive(true);
    setTimeout(() => {
      setLeftSmallIconActive(false);
      setLeftIconActive(true);
    }, 160);
    setTimeout(() => {
      setLeftIconActive(false);
    }, 320);
    animatePageTurn("left");
  };

  // Funzione per sfogliare pagina avanti e cambiare il colore delle icone ChevronRightIcon
  const handleRightClick = () => {
    if (isFlipping || currentPage >= pages.length - 2) return;
    setRightSmallIconActive(true);
    setTimeout(() => {
      setRightSmallIconActive(false);
      setRightIconActive(true);
    }, 160);
    setTimeout(() => {
      setRightIconActive(false);
    }, 320);
    animatePageTurn("right");
  };

  return (
    <div className="flex flex-col md:flex-row justify-around items-center h-auto md:h-3/4 gap-4 md:gap-0 w-full px-2 sm:px-4">
      {/* Controllo cambio pagina (sinistra) */}
      <div
        className={`
        relative pe-2 py-1 sm:pe-4 sm:py-2 rounded-full
        ${
          currentPage <= 0 || isFlipping
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
            currentPage <= 0
              ? "text-gray-400"
              : leftIconActive
              ? "text-[#ffe566]"
              : "text-[#02c39a]"
          }
        `}
          aria-hidden="true"
        />
        <ChevronLeftIcon
          className={`
          absolute top-[8px] left-[12px] sm:top-[16px] sm:left-[16px] w-6 h-6 sm:w-8 sm:h-8 lg:left-[24px] lg:w-12 lg:h-12 transition-transform duration-200 group-hover:scale-125
          ${
            currentPage <= 0
              ? "text-gray-400"
              : leftSmallIconActive
              ? "text-[#ffe566]"
              : "text-[#02c39a]"
          }
        `}
          aria-hidden="true"
        />
      </div>

      {/* Contenitore del libro */}
      <div
        ref={containerRef}
        className="relative flex h-[320px] sm:h-[420px] md:h-full w-full max-w-md sm:max-w-2xl md:max-w-3xl rounded-lg overflow-hidden"
      >
        {/* Pagina destra (pagina corrente) - SEMPRE visibile durante lo sfogliamento verso sinistra */}
        {/* Questo garantisce che rimanga visibile mentre la pagina sinistra si gira */}
        {flipDirection === "left" && (
          <div
            className={`
              absolute flex justify-center items-center z-5 top-0 right-0 w-1/2 h-full group right-page
              ${pages[rightPage]?.imageUrl ? "" : "end-page"}
            `}
            style={{
              background: pages[rightPage]?.imageUrl
                ? `url(${pages[rightPage].imageUrl}) center/cover no-repeat`
                : "#353535",
            }}
          >
            {/* Renderizza il titolo SOLO se non stai sfogliando */}
            {!isFlipping ? (
              <div
                className={`
                  p-2 text-sm md:text-lg font-bold truncate opacity-0 group-hover:opacity-100 transition
                  ${
                    pages[rightPage]?.title
                      ? "text-black pages-text"
                      : "text-white select-none"
                  }
                `}
                onClick={() => handlePageClick(rightPage)}
              >
                {pages[rightPage]?.title || "Fine"}
              </div>
            ) : null}
          </div>
        )}

        {/* Pagina sinistra (pagina corrente) - visibile quando non sta sfogliando */}
        {!isFlipping && (
          <div
            className="w-1/2 h-full z-5 flex items-center justify-center group left-page"
            style={{
              background: `url(${pages[leftPage]?.imageUrl}) center/cover no-repeat`,
            }}
          >
            <div
              className="p-1 sm:p-2 text-sm md:text-lg font-bold opacity-0 group-hover:opacity-100 transition pages-text truncate"
              onClick={() => handlePageClick(leftPage)}
            >
              {pages[leftPage]?.title}
            </div>
          </div>
        )}

        {/* Pagina destra (pagina corrente) - visibile quando non sta sfogliando e non sta sfogliando a sinistra */}
        {!isFlipping && flipDirection !== "left" && (
          <div
            className={`
              w-1/2 h-full z-5 flex items-center justify-center group right-page
              ${pages[rightPage]?.imageUrl ? "" : "end-page"}
            `}
            style={{
              background: pages[rightPage]?.imageUrl
                ? `url(${pages[rightPage].imageUrl}) center/cover no-repeat`
                : "#353535",
            }}
          >
            <div
              className={`
                p-2 text-sm md:text-lg font-bold truncate opacity-0 group-hover:opacity-100 transition
                ${
                  pages[rightPage]?.title
                    ? "text-black pages-text"
                    : "text-white select-none"
                }
              `}
              onClick={() => handlePageClick(rightPage)}
            >
              {pages[rightPage]?.title || "Fine"}
            </div>
          </div>
        )}

        {/* Pagina sinistra (pagina corrente) - visibile quando si sta sfogliando a destra */}
        {isFlipping && flipDirection === "right" && (
          <div
            className="absolute top-0 left-0 w-1/2 h-full z-5 flex items-center justify-center left-page"
            style={{
              background: `url(${pages[leftPage]?.imageUrl}) center/cover no-repeat`,
            }}
          ></div>
        )}

        {/* Pagina successiva (sinistra) - visibile solo durante l'animazione verso sinistra */}
        {isFlipping && flipDirection === "left" && pages[nextLeftPage] && (
          <div
            className="absolute top-0 left-0 w-1/2 h-full z-10 flex items-center justify-center left-page"
            style={{
              background: `url(${pages[nextLeftPage]?.imageUrl}) center/cover no-repeat`,
            }}
          ></div>
        )}

        {/* Pagina successiva (destra) - visibile solo durante l'animazione verso destra*/}
        {isFlipping && flipDirection === "right" && (
          <div
            className={`
      absolute top-0 right-0 w-1/2 h-full z-10 flex items-center justify-center right-page
      ${nextRightImage ? "" : "end-page"}
    `}
            style={{
              backgroundColor: "#353535",
              backgroundImage: nextRightImage
                ? `url(${nextRightImage})`
                : "none",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        )}

        {/* Pagina che si sta sfogliando */}
        {isFlipping && (
          <motion.div
            className="absolute top-0 w-1/2 h-full flex items-center justify-center overflow-hidden"
            style={{
              left: flipDirection === "left" ? "0" : "50%",
              transformOrigin:
                flipDirection === "left"
                  ? "right center" // Per la pagina sinistra, il punto di rotazione è a destra
                  : "left center", // Per la pagina destra, il punto di rotazione è a sinistra
              zIndex: 30, // Sempre sopra le altre pagine
            }}
            animate={pageControls}
          >
            {currentFlipBgImage && (
              <img
                src={currentFlipBgImage}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  transform: isRotated ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
                draggable={false}
              />
            )}
            {/* Ombra dinamica */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to ${
                  flipDirection === "left" ? "left" : "right"
                }, 
                              rgba(0,0,0,0) ${
                                80 - Math.abs(pageCurvature) * 1.5
                              }%, 
                              rgba(0,0,0,${pageShadowOpacity * 0.7}) 100%)`,
                opacity: pageShadowOpacity * 2,
                pointerEvents: "none",
              }}
            />
          </motion.div>
        )}
      </div>

      {/* Controllo cambio pagina (destra) */}
      <div
        className={`
        relative pl-2 py-1 sm:pl-4 sm:py-2 rounded-full mb-4 md:mb-0
        ${
          currentPage >= pages.length - 2 || isFlipping
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
            currentPage >= pages.length - 2
              ? "text-gray-400"
              : rightIconActive
              ? "text-[#ffe566]"
              : "text-[#02c39a]"
          }
        `}
          aria-hidden="true"
        />
        <ChevronRightIcon
          className={`
          absolute top-[8px] right-[12px] sm:top-[16px] sm:right-[16px] w-6 h-6 sm:w-8 sm:h-8 lg:right-[24px] lg:w-12 lg:h-12 transition-transform duration-200 group-hover:scale-125
          ${
            currentPage >= pages.length - 2
              ? "text-gray-400"
              : rightSmallIconActive
              ? "text-[#ffe566]"
              : "text-[#02c39a]"
          }
        `}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}