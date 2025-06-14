import React, { useState, useEffect } from "react";
import { SimpleAlert } from "../ui";
import AdminProjectEditForm from "./AdminProjectEditForm";
import AdminProjectImageEditForm from "./AdminProjectImageEditForm";

const AdminProjectEdit = ({ selectedProject, setIsEditButtonClicked }) => {
    // Stati per gestire UI e flusso
    const [message, setMessage] = useState({ text: "", type: "" });
    const [isProjectForm, setIsProjectForm] = useState(true);

    // Stato per salvare mediaUrl dell'immagine copertina progetto
    const [uploadedProjectImg, setUploadedProjectImg] = useState("");

    // Imposta il messaggio iniziale quando il componente viene montato
    useEffect(() => {
    setInitialMessage();
    }, [isProjectForm]);

    // Funzione per impostare il messaggio iniziale in base al form renderizzato
    const setInitialMessage = () => {
        if (isProjectForm) {
        setMessage({
            text: "Modifica i campi che desideri",
            type: "info",
        });
        } else {
        setMessage({
            text: "Carica una nuova immagine per il tuo progetto",
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
        <div className="max-w-4xl bg-black/40 rounded-md mx-auto py-8 px-4">
            {/* Mostra messaggi con SimpleAlert */}
            <SimpleAlert
                message={message.text || "Caricamento..."}
                type={message.type}
                duration={0} // Non scompare automaticamente (di default anche SimpleAlert ha duration = 5000)
            />

            <div className="flex justify-center">
                <h1 className="w-fit p-4 text-xl font-bold text-white bg-black/80 rounded-full select-none my-5">
                    {isProjectForm ? "Modifica il progetto" : "Carica una nuova immagine"}
                </h1>
            </div>

            {isProjectForm ? (
                // Form modifica progetto
                <AdminProjectEditForm
                    setIsProjectForm={setIsProjectForm}
                    setIsEditButtonClicked={setIsEditButtonClicked}
                    uploadedProjectImg={uploadedProjectImg}
                    setUploadedProjectImg={setUploadedProjectImg}
                    selectedProject={selectedProject}
                    setMessage={setMessage}
                    showTemporaryMessage={showTemporaryMessage}
                />
            ) : (
                // Form carica nuova immagine progetto
                <AdminProjectImageEditForm
                    setIsProjectForm={setIsProjectForm}
                    setUploadedProjectImg={setUploadedProjectImg}
                    setMessage={setMessage}
                    showTemporaryMessage={showTemporaryMessage}
                />
            )}
        </div>
    );
};

export default AdminProjectEdit;