import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useInView } from "framer-motion";
import "./HeroCards.css";

export default function HeroCards({ featuredProjects }) {
  /*
  La funzione handleClick sfrutta lo useState selectedCard per salvare, a seconda della Card cliccata, 
  uno dei seguenti valori: c1, c2, c3, c4.
  Tramite la funzione getCardClass vengono impostate delle classi:
  la classe 'card' viene impostata su tutte le Card;
  vengono impostate quattro classi diverse su ogniuna delle quattro Card (c1, c2, c3, c4);
  se selectedCard coincide con cardClass allora viene impostata la classe 'selected' 
  che consente di vedere la Card in primo piano.
  */
  const [selectedCard, setSelectedCard] = useState(null);

  const navigate = useNavigate();

  /* 
  Chiave unica per il localStorage
  Salvo i dati relativi al progetto per visualizzarli nella pagina dettagli
  */
 const STORAGE_KEY= "portfolio_project_details";

  // Ref e useInView per animazione all'apparizione
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    amount: 1,
    once: false,
  });

  // Gestisce il click sulle Card
  const handleCardClick = (cardClass) => {
    setSelectedCard(cardClass);
  };

  // Gestisce il click su h3 per visualizzare il progetto
  const handleButtonClick = (index=null) => {
    // Salvo i dati relativi al progetto nel localStorage se viene passato un index del progetto da salvare
    if(index != null) {
      try {
        const dataToSave = JSON.stringify(featuredProjects[index]);
        localStorage.setItem(STORAGE_KEY, dataToSave);
        console.log("Salvati dati nel localStorage:", featuredProjects[index]);
      } catch (error) {
        console.error(
          "Errore durante il salvataggio dei dati nel localStorage:",
          error
        );
      }
    };

    navigate("/project/details");
  }

  /*
  La funzione handleIconClick viene utilizzata sulle icone <XCircleIcon> presenti su ogniuna delle Card
  imposta selectedCard a 'null' e consente quindi di rimuovere la classe 'selected' 
  (Card non viene visualizzata in primo piano)
  */
  const handleIconClick = (event) => {
    event.stopPropagation();
    setSelectedCard(null);
  };

  // La funziona getCardClass imposta le classi su ogniuna delle Card.
  const getCardClass = (cardClass) => {
    // Non applicare animazioni se la card è selected
    const baseClass = `card ${cardClass}`;
    const selectedClass = selectedCard === cardClass ? "selected" : "";
    return `${baseClass} ${selectedClass}`;
  };

  // La funzione getCardStyle imposta inline style per evitare conflitti tra le classi definite in HeroCards.css.
  const getCardStyle = (cardClass) => {
    if (selectedCard === cardClass) {
      return {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%) scale(1.9) rotate(0deg)",
        zIndex: 10,
        cursor: "default",
        animation: "none", // Ferma le animazioni CSS
      };
    }
    return {};
  };

  return (
    <div>
      <h3 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-lobster">
        These are my featured projects
      </h3>
      <div
        ref={containerRef}
        className="grid h-[20vmax] mt-28 place-items-center select-none"
      >
        <div
          className={`${getCardClass(
            isInView ? "c1" : "c1-reverse"
          )} bg-[#2196f3] text-[#fdee00]`}
          style={getCardStyle("c1")}
          onClick={() => (isInView ? handleCardClick("c1") : handleCardClick(null))}
        >
          <h1 className="num">4</h1>
          <XCircleIcon
            className="xicon w-[14px]"
            onClick={(event) => handleIconClick(event)}
          />
          <div className="h-full">
            <h3 
              className={`
                text-md font-lobster py-1
                ${selectedCard === "c1" && featuredProjects[3] ? "cursor-pointer hover:text-[#fdee00]/60" : ""}
              `}
              onClick={selectedCard === "c1" && featuredProjects[3] ? () => handleButtonClick(3) : undefined}
            >
              {featuredProjects[3] ? featuredProjects[3].title : "Coming Soon"}
            </h3>
            <p
              className={`
              h-[80%] text-[0.625rem] text-left font-montserrat pe-4 pl-1
              ${selectedCard === "c1" ? "overflow-y-scroll" : "overflow-y-hidden"}
              `}
            >
              {featuredProjects[3] 
                ? featuredProjects[3].description 
                : "This project is currently unavailable"
              }
            </p>
          </div>
        </div>
        <div
          className={`${getCardClass(
            isInView ? "c2" : "c2-reverse"
          )} bg-[#d9a76a] text-[#00171f]`}
          style={getCardStyle("c2")}
          onClick={() => (isInView ? handleCardClick("c2") : handleCardClick(null))}
        >
          <h1 className="num">3</h1>
          <XCircleIcon
            className="xicon w-[14px]"
            onClick={(event) => handleIconClick(event)}
          />
          <div className="h-full">
            <h3 
              className={`
                text-md font-lobster py-1
                ${selectedCard === "c2" && featuredProjects[2] ? "cursor-pointer hover:text-[#00171f]/60" : ""}
              `}
              onClick={selectedCard === "c2" && featuredProjects[2] ? () => handleButtonClick(2) : undefined}
            >
              {featuredProjects[2] ? featuredProjects[2].title : "Coming Soon"}
            </h3>
            <p
              className={`
              h-[80%] text-[0.625rem] text-left font-montserrat pe-4 pl-1
              ${selectedCard === "c2" ? "overflow-y-scroll" : "overflow-y-hidden"}
              `}
            >
              {featuredProjects[2] 
                ? featuredProjects[2].description 
                : "This project is currently unavailable"
              }
            </p>
          </div>
        </div>
        <div
          className={`${getCardClass(
            isInView ? "c3" : "c3-reverse"
          )} bg-[#000505] text-[#b7ff00]`}
          style={getCardStyle("c3")}
          onClick={() => (isInView ? handleCardClick("c3") : handleCardClick(null))}
        >
          <h1 className="num">2</h1>
          <XCircleIcon
            className="xicon w-[14px]"
            onClick={(event) => handleIconClick(event)}
          />
          <div className="h-full">
            <h3 
              className={`
                text-md font-lobster py-1
                ${selectedCard === "c3" && featuredProjects[1] ? "cursor-pointer hover:text-[#b7ff00]/60" : ""}
              `}
              onClick={selectedCard === "c3" && featuredProjects[1] ? () => handleButtonClick(1) : undefined}
            >
              {featuredProjects[1] ? featuredProjects[1].title : "Coming Soon"}
            </h3>
            <p
              className={`
              h-[80%] text-[0.625rem] text-left font-montserrat pe-4 pl-1
              ${selectedCard === "c3" ? "overflow-y-scroll" : "overflow-y-hidden"}
              `}
            >
              {featuredProjects[1] 
                ? featuredProjects[1].description 
                : "This project is currently unavailable"
              }
            </p>
          </div>
        </div>
        <div
          className={`${getCardClass(
            isInView ? "c4" : "c4-reverse"
          )} bg-[#660014] text-white`}
          style={getCardStyle("c4")}
          onClick={() => (isInView ? handleCardClick("c4") : handleCardClick(null))}
        >
          <h1 className="num">1</h1>
          <XCircleIcon
            className="xicon w-[14px]"
            onClick={(event) => handleIconClick(event)}
          />
          <div className="h-full">
            <h3 
              className={`
                text-md font-lobster py-1
                ${selectedCard === "c4" && featuredProjects[0] ? "cursor-pointer hover:text-white/60" : ""}
              `}
              onClick={selectedCard === "c4" && featuredProjects[0] ? () => handleButtonClick(0) : undefined}
            >
              {featuredProjects[0] ? featuredProjects[0].title : "Coming Soon"}
            </h3>
            <p
              className={`
              h-[80%] text-[0.625rem] text-left font-montserrat pe-4 pl-1
              ${selectedCard === "c4" ? "overflow-y-scroll" : "overflow-y-hidden"}
              `}
            >
              {featuredProjects[0] 
                ? featuredProjects[0].description 
                : "This project is currently unavailable"
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}