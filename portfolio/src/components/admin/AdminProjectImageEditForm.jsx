import React, { useState } from "react";
import { mediaService } from "../../services/apiService";

const AdminProjectImageEditForm = ({
  setIsProjectForm,
  setUploadedProjectImg,
  setMessage,
  showTemporaryMessage,
}) => {
  // Stati per gestire l'upload del media
  const [file, setFile] = useState(null);
  const [mediaTitle, setMediaTitle] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [mediaLoading, setMediaLoading] = useState(false);

  // Funzione per tornare al form progetto dopo che è stata caricata l'immagine
  const returnToProjectForm = (imageUrl = "") => {
    if (imageUrl) {
      setUploadedProjectImg(imageUrl);
    }

    // Mostra messaggio e torna al form progetto dopo un breve delay
    showTemporaryMessage(
      "Immagine caricata! Ritorno al form progetto...",
      "success"
    );

    setTimeout(() => {
      setIsProjectForm(true);
    }, 1500);
  };

  // Gestisce il cambio del file
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      // Crea un URL di anteprima
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(selectedFile);
    }
  };

  // Gestisce il click sul bottone "Indietro"
  const handleBackClick = () => {
    setIsProjectForm(true);
  };

  // Reset del form
  const resetForm = () => {
    setFile(null);
    setMediaTitle("");
    setPreviewUrl("");
    setMediaType("");
    setCategory("project");
  };

  // Invia il form dell'immagine
  const handleMediaUpload = async (e) => {
    e.preventDefault();

    if (!mediaTitle.trim()) {
      setMessage({ text: "Inserisci un titolo per l'immagine", type: "warning" });
      return;
    }

    // Validazione di base
    if (!file) {
      setMessage({ text: "Seleziona un'immagine da caricare", type: "warning" });
      return;
    }

    // Avvia caricamento
    setMediaLoading(true);
    setMessage({ text: "Caricamento in corso...", type: "info" });

    try {
      // Crea FormData per l'upload
      const formData = new FormData();
      formData.append("media", file);
      formData.append("title", mediaTitle);
      formData.append("category", "project");

      // Invia al server
      const response = await mediaService.uploadMedia(formData);

      console.log("AdminProjectImageEditForm - Media caricato con successo:", response.data);

      // Estrai l'URL dell'immagine caricata
      const mediaUrl = response.data.data.mediaUrl;

      // Torna al form del progetto
      returnToProjectForm(mediaUrl);
    } catch (error) {
      console.error("AdminProjectImageEditForm - Errore durante il caricamento:", error);
      setMessage({
        text: `Errore durante il caricamento: ${
          error.response?.data?.error || error.message
        }`,
        type: "error",
      });
    } finally {
      setMediaLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleMediaUpload}
      className="bg-[#f1faee] shadow-md rounded-lg p-3 sm:p-4 md:p-6 mb-8 max-w-lg mx-auto w-full"
    >
      {/* Banner informativo */}
        <div className="p-3 sm:p-4 mb-4 bg-blue-100 text-blue-800 rounded-lg text-center">
            <p className="font-medium text-sm sm:text-base">
            Stai caricando un'immagine per il tuo progetto
            </p>
            <p className="text-xs sm:text-sm">
            Dopo il caricamento, tornerai automaticamente al form del progetto
            </p>
        </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-xs sm:text-sm font-bold mb-2">
          Titolo dell'immagine <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={mediaTitle}
          onChange={(e) => setMediaTitle(e.target.value)}
          className="w-full px-2 sm:px-3 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
          placeholder="Titolo dell'immagine"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-xs sm:text-sm font-bold mb-2">
          Categoria
        </label>
        <select
          value="project"
          disabled
          className="w-full px-2 sm:px-3 py-2 border rounded-lg text-black text-xs sm:text-sm"
        >
          <option value="project">Progetto</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-xs sm:text-sm font-bold mb-2">
          File (Immagine) <span className="text-red-500"> *</span>
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full px-2 sm:px-3 py-2 border rounded-lg text-xs sm:text-sm"
          accept="image/*"
        />
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Formati supportati: JPG, PNG, GIF, SVG
        </p>
      </div>

      {previewUrl && (
        <div className="mt-4 mb-6 flex flex-col items-center">
          <p className="text-xs sm:text-sm font-bold text-gray-700 mb-2">
            Anteprima:
          </p>
          <img
            src={previewUrl}
            alt="Anteprima"
            className="max-h-48 sm:max-h-60 max-w-full rounded-lg shadow"
          />
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4">
        <button
          type="button"
          onClick={handleBackClick}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-xs sm:text-sm w-full sm:w-auto"
        >
          Annulla
        </button>

        <button
          type="submit"
          disabled={mediaLoading}
          className={`px-6 py-2 rounded-lg font-medium text-xs sm:text-sm w-full sm:w-auto ${
            mediaLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          }`}
        >
          {mediaLoading ? "Caricamento..." : "Carica Media"}
        </button>
      </div>
    </form>
  );
};

export default AdminProjectImageEditForm;