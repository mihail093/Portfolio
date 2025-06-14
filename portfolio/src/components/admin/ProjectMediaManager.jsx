import React, { useState, useEffect } from "react";
import { Button, SimpleAlert } from "../ui";
import NewProjectForm from "./NewProjectForm";
import NewMediaForm from "./NewMediaForm";

const ProjectMediaManager = () => {  
  // Stati per gestire UI e flusso
  const [message, setMessage] = useState({ text: "", type: "" });
  const [step, setStep] = useState(1); // 1: Form progetti, 2: Form media

  // Stato per verificare se sta venedo caricata un'immagine copertina progetto
  const [uploadingProjectImg, setUploadingProjectImg] = useState(false);

  // Stato per salvare mediaUrl dell'immagine copertina progetto
  const [uploadedProjectImg, setUploadedProjectImg] = useState("");

  // Imposta il messaggio iniziale quando il componente viene montato
  useEffect(() => {
    setInitialMessage();
  }, [step, uploadingProjectImg]);

  // Funzione per alternare tra i due form
  const handleToggleForm = () => {
    // Se stiamo tornando al form progetti mentre stiamo caricando un'immagine per un progetto,
    // reimpostiamo uploadingProjectImg a false
    if (step === 2 && uploadingProjectImg) {
      setUploadingProjectImg(false);
    }

    // Passa all'altro form
    setStep((prevStep) => (prevStep === 1 ? 2 : 1));

    // Reimposta il messaggio iniziale
    setInitialMessage();
  };

  // Funzione per impostare il messaggio iniziale in base allo step corrente
  const setInitialMessage = () => {
    if (step === 1) {
      setMessage({
        text: "Compila il form per creare un nuovo progetto",
        type: "info",
      });
    } else {
      setMessage({
        text: uploadingProjectImg
          ? "Carica un'immagine per il tuo progetto"
          : "Carica un nuovo media",
        type: "info",
      });
    }
  };

  // Funzione per mostrare messaggi temporanei
  const showTemporaryMessage = (messageText, messageType, duration = 5000) => {
    setMessage({ text: messageText, type: messageType });

    if (duration > 0) {
      setTimeout(() => {
        setInitialMessage();
      }, duration);
    }
  };

  return (
    <div className="max-w-4xl bg-black/40 rounded-md mx-auto py-2 px-1 sm:py-4 sm:px-2">
      {/* Bottone per alternare tra i form */}
      <Button
        handleClick={handleToggleForm}
        label={step === 1 ? "carica media" : "carica progetto"}
      />

      {/* Mostra messaggi con SimpleAlert */}
      <SimpleAlert
        message={message.text || "Caricamento..."}
        type={message.type}
        duration={0} // Non scompare automaticamente (di default anche SimpleAlert ha duration = 5000)
      />
      
      <div className="flex justify-center">
        <h1 className="w-fit p-3 text-xs sm:text-base md:text-lg font-bold text-white bg-black/80 rounded-full select-none my-5">
          {step === 1 ? "Aggiungi nuovo Progetto" : "Aggiungi nuovo media"}
        </h1>
      </div>

      {step === 1 ? (
        // Form progetto
        <NewProjectForm
          setUploadingProjectImg={setUploadingProjectImg}
          setStep={setStep}
          uploadedProjectImg={uploadedProjectImg}
          setUploadedProjectImg={setUploadedProjectImg}
          setMessage={setMessage}
          showTemporaryMessage={showTemporaryMessage}
        />
      ) : (
        // Form media
        <NewMediaForm
          uploadingProjectImg={uploadingProjectImg}
          setUploadingProjectImg={setUploadingProjectImg}
          setStep={setStep}
          setUploadedProjectImg={setUploadedProjectImg}
          setMessage={setMessage}
          showTemporaryMessage={showTemporaryMessage}
        />
      )}
    </div>
  );
};

export default ProjectMediaManager;