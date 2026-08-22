import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import WeddingEnvelopeVideo from "../../../assets/assets_workInProgress/EnvelopeVideo.mp4";
import "./EnvelopeVideo.css";

export default function EnvelopeVideo() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  // Funzione helper per verificare se il dispositivo è in Portrait
  const isPortrait = () => {
    if (window.matchMedia) {
      return window.matchMedia("(orientation: portrait)").matches;
    }
    return window.innerHeight > window.innerWidth;
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // Gestione reindirizzamento a fine video
    const handleVideoEnd = () => {
      navigate("/admin/progress");
    };

    // Aggiungo listener per evento fine video
    videoElement.addEventListener("ended", handleVideoEnd);

    // Funzione che gestisce Play / Pause al cambio di orientamento
    const handleOrientationCheck = () => {
      if (isPortrait()) {
        // Se siamo in Portrait e il video è in pausa, avvialo
        if (videoElement.paused) {
          // Annulla eventuali timer precedenti
          if (timerRef.current) clearTimeout(timerRef.current);

          // Avvia il video dopo il delay di 1200ms
          timerRef.current = setTimeout(() => {
            videoElement.play().catch((error) => {
              console.log("Autoplay bloccato dal browser:", error);
              navigate("/admin/progress");
            });
          }, 1200);
        }
      } else {
        // Se siamo in Landscape, cancella il timer pendente e metti in pausa
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        videoElement.pause();
      }
    };

    // Ascolta il cambio di orientamento (supporta sia l'API moderna che il resize fallback)
    window.addEventListener("resize", handleOrientationCheck);
    if (window.screen && window.screen.orientation) {
      window.screen.orientation.addEventListener("change", handleOrientationCheck,);
    }

    // Esegui subito il controllo al primo caricamento del componente
    handleOrientationCheck();

    // CLEANUP GENERALE
    return () => {
      videoElement.removeEventListener("ended", handleVideoEnd);
      window.removeEventListener("resize", handleOrientationCheck);
      if (window.screen && window.screen.orientation) {
        window.screen.orientation.removeEventListener(
          "change",
          handleOrientationCheck,
        );
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [navigate]);

  return (
    <>
      <div className="rotate-warning">
        <p>Za optimalni prikaz pozivnice, rotiraj telefon uspravno</p>
      </div>
      <div className="video-container">
        <video
          ref={videoRef}
          src={WeddingEnvelopeVideo}
          muted
          playsInline
          preload="auto"
          className="video"
        />
      </div>
    </>
  );
}
