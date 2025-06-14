import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui";
import { useTheme } from "../../context/ThemeContext";
import "./Card.css";

export default function Card({ title, image, allProjectData, handleCloseButton }) {
  const { isDark } = useTheme();
  
  // useNavigate per visualizzare i dettagli del progetto selezionato
  const navigate = useNavigate();

  // const ref viene utilizzata all'interno di handleClick per <div>
  const cardRef = useRef(null);

  /* 
  Chiave unica per il localStorage
  Salvo i dati relativi al progetto per visualizzarli nella pagina dettagli
  */
 const STORAGE_KEY= "portfolio_project_details";

  const handleDetailsButtonClick = () => {
    try {
      // Salvo tutti i dati relativi al progetto
      const dataToSave = JSON.stringify(allProjectData);
      localStorage.setItem(STORAGE_KEY, dataToSave);
      console.log("Salvati dati nel localStorage:", allProjectData);
    } catch (error) {
      console.error(
        "Errore durante il salvataggio dei dati nel localStorage:",
        error
      );
    }
    navigate("/project/details");
  };

  const handleCloseButtonClick = () => {
    if (cardRef.current) {
      cardRef.current.style.animation = "slideOut 0.8s forwards";
      setTimeout(handleCloseButton, 500);
    }
  };

  return (
    <div
      ref={cardRef}
      className={`card-container ${
        isDark
          ? "bg-[#000505] text-[#a2e200] shadow-darkMode"
          : "bg-[#2196f3] text-[#fdee00] shadow-lightMode"
      }`}
    >
      <h1 className="font-lobster cursor-default text-center text-lg md:text-2xl lg:text-3xl">
        {title}
      </h1>
      <img src={image} className="image" alt={title} />
      <div className="button-container">
        <Button label="see more" handleClick={handleDetailsButtonClick} />
        <Button label="close" handleClick={handleCloseButtonClick} />
      </div>
    </div>
  );
}