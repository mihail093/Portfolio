import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Pagina2Background from "../../assets/assets_workInProgress/background.webp";
import Pagina2Disegno from "../../assets/assets_workInProgress/Pagina2_disegno.webp";
import Pagina2Logo from "../../assets/assets_workInProgress/Pagina2_logo.webp";
import QRCodeBackground from "../../assets/assets_workInProgress/QR_code_bg.webp";
import QRCode from "../../assets/assets_workInProgress/QR_code_esempio.webp";
import "./InProgress.css";

export default function InProgress() {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [isFinished, setIsFinished] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  // 1. Logica del Countdown (invariata)
  useEffect(() => {
    const weddingDate = new Date("September 5, 2027 10:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setIsFinished(true);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24))
          .toString()
          .padStart(2, "0"),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          .toString()
          .padStart(2, "0"),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
          .toString()
          .padStart(2, "0"),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
          .toString()
          .padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 2. Gestione Link Mappe
  const getMapLink = () => {
    const lat = "44.60286612957192";
    const lon = "21.127036543075704";
    const isiOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    return isiOS
      ? `http://maps.apple.com/?daddr=${lat},${lon}&dirflg=d`
      : `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;
  };

  // 3. Funzione per rimuovere l'overlay
  const handleOverlayClick = () => {
    setShowOverlay(false);
    document.body.classList.remove("no-scroll");
  };

  useEffect(() => {
    document.body.classList.add("no-scroll");
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <>
      <main
          className="wedding-main"
          style={{
              backgroundImage: Pagina2Background ? `url(${Pagina2Background})` : null,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "repeat",
              backgroundAttachment: "scroll",
          }}
      >
        {/* Overlay Iniziale gestito da Framer Motion */}
        <AnimatePresence>
          {showOverlay && (
            <motion.div
              key="overlay"
              className="overlay"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.8, ease: [0.45, 0, 0.55, 1] }}
              onClick={handleOverlayClick}
            >
              <h1 id="overlayText">klikni</h1>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="main-content">
          <div className="img-container">
            <img src={Pagina2Logo} alt="immagine logo" />
          </div>
          <div className="text-container">
            <h1 className="wedding-title">SAVE THE DATE</h1>
            <p className="main-italic-text">Anđela and Aleksandar</p>
            <h2 className="date">5 | 09 | 2027</h2>
          </div>
          <div className="img-container">
            <img src={Pagina2Disegno} alt="disegno decorativo" />
          </div>
        </div>

        <div className="other-content">
          <a
            href={getMapLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="link-location"
          >
            <span className="link-title">VIDI DETALJE</span>
            <span className="link-subtitle">location</span>
          </a>

          <div className="countdown-container">
            {isFinished ? (
              <h3>Danas je važan dan!</h3>
            ) : (
              <div
                className="countdown-wrapper"
                style={{ display: "flex", gap: "10px" }}
              >
                {["days", "hours", "minutes", "seconds"].map((unit) => (
                  <div className="time-block" key={unit}>
                    {/* Animazione fluida del cambio numero opzionale */}
                    <motion.span
                      key={timeLeft[unit]}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {timeLeft[unit]}
                    </motion.span>
                    <p>{unit.charAt(0).toUpperCase() + unit.slice(1)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </main>
      <div 
        className="desktop-only-overlay"
        style={{
            backgroundImage: QRCodeBackground ? `url(${QRCodeBackground})` : null,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }}
      >
        <div className="wedding-card">
          <h1>A & A</h1>
          <img src={QRCode} alt="QR code" />
          <p>
            Skenirajte QR kod da biste posetili našu digitalnu pozivnicu za
            venčanje.
          </p>
        </div>
      </div>
    </>
  );
}
