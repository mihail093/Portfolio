import React, { useState } from "react";
import { mediaService } from "../../services/apiService";

const NewMediaForm = ({
  uploadingProjectImg,
  setUploadingProjectImg,
  setStep,
  setUploadedProjectImg,
  setMessage,
  showTemporaryMessage,
}) => {
  // Stati per gestire l'upload del media
  const [file, setFile] = useState(null);
  const [mediaTitle, setMediaTitle] = useState("");
  const [category, setCategory] = useState("project");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [mediaType, setMediaType] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [mediaLoading, setMediaLoading] = useState(false);

  // Funzione per tornare al form progetto (quando si sta caricando immagine copertina progetto)
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
      setUploadingProjectImg(false);
      setStep(1);
    }, 1500);
  };

  // Gestisce il cambio del file
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      // Determina il tipo di media
      const isImage = selectedFile.type.startsWith("image/");
      setMediaType(isImage ? "image" : "video");
      
      // Se stiamo caricando un'immagine per un progetto, verifica che sia un'immagine
      if (uploadingProjectImg && !isImage) {
        showTemporaryMessage(
          "Per i progetti è necessario caricare un'immagine, non un video!",
          "warning"
        );

        return;
      }

      // Crea un URL di anteprima
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(selectedFile);
    }
  };

  // Gestisce l'aggiunta di un tag
  const handleAddTag = () => {
    if (
      tagInput.trim() &&
      !tags.includes(tagInput.trim())
    ) {
      setTags((prev) => ([
        ...prev, tagInput.trim(),
      ]));
      setTagInput("");
    }
  };

  // Gestisce la rimozione di un tag
  const handleRemoveTag = (tag) => {
    setTags((prev) => ([
      ...prev.filter((t) => t !== tag),
    ]));
  };

  // Gestisce il click sul bottone "Indietro"
  const handleBackClick = () => {
    if (uploadingProjectImg) {
      // Se stiamo tornando dal caricamento di un'immagine per un progetto
      setUploadingProjectImg(false);
    }

    setStep(1);
  };

  // Reset del form
  const resetForm = () => {
    setFile(null);
    setMediaTitle("");
    setPreviewUrl("");
    setMediaType("");
    setCategory("project");
    setTagInput("");
    setTags([]);
  };

  // Invia il form del media
  const handleMediaUpload = async (e) => {
    e.preventDefault();

    if (!mediaTitle.trim()) {
      setMessage({ text: "Inserisci un titolo per il media", type: "warning" });
      return;
    }

    // Validazione di base
    if (!file) {
      setMessage({ text: "Seleziona un file da caricare", type: "warning" });
      return;
    }

    // Se stiamo caricando un'immagine copertina per un progetto, verifica che sia un'immagine
    if (uploadingProjectImg && mediaType !== "image") {
      setMessage({
        text: "Per i progetti è necessario caricare un'immagine copertina!",
        type: "warning",
      });
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
      formData.append("category", category);

      // Aggiungi i tag al FormData se forniti
      if (tags && tags.length > 0) {
        const tagsString = Array.isArray(tags) ? tags.join(',') : tags;
        formData.append('tags', tagsString);
      }

      // Invia al server
      const response = await mediaService.uploadMedia(formData);

      console.log("NewMediaForm - Media caricato con successo:", response.data);

      // Estrai l'URL dell'immagine caricata
      const mediaUrl = response.data.data.mediaUrl;

      // Se stiamo caricando un'immagine per un progetto
      if (uploadingProjectImg && mediaType === "image") {
        returnToProjectForm(mediaUrl);
      } else {
        // Reset del form per caricamenti normali
        resetForm();

        // Mostra messaggio di successo
        showTemporaryMessage("Media caricato con successo!", "success");
      }
    } catch (error) {
      console.error("NewMediaForm - Errore durante il caricamento:", error);
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
      className="bg-white/95 shadow-md rounded-lg p-3 sm:p-4 md:p-6 mb-8 max-w-lg mx-auto w-full"
    >
      {/* Banner informativo se stiamo caricando un'immagine per un progetto */}
      {uploadingProjectImg && (
        <div className="p-3 sm:p-4 mb-4 bg-blue-100 text-blue-800 rounded-lg text-center">
          <p className="font-medium text-sm sm:text-base">
            Stai caricando un'immagine per il tuo progetto
          </p>
          <p className="text-xs sm:text-sm">
            Dopo il caricamento, tornerai automaticamente al form del progetto
          </p>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 text-xs sm:text-sm font-semibold sm:font-bold mb-2">
          Titolo del Media <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={mediaTitle}
          onChange={(e) => setMediaTitle(e.target.value)}
          className="w-full px-2 sm:px-3 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
          placeholder="Titolo del media"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-xs sm:text-sm font-semibold sm:font-bold mb-2">
          Categoria
        </label>
        <select
          value={category}
          disabled={!!uploadingProjectImg}
          onChange={(e) => setCategory(e.target.value)}
          className="
            w-full px-1 sm:px-3 py-2 rounded-lg text-black text-xs sm:text-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer
          "
        >
          <option value="project">Progetto</option>
          <option value="other">Altro</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-xs sm:text-sm font-semibold sm:font-bold mb-2">
          Tags <span className="text-red-500">*</span>
        </label>
        <div className="flex">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            className="w-0 min-w-0 flex-grow px-2 sm:px-3 py-2 border rounded-l-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
            placeholder="Associa il media ad uno specifico progetto"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTag();
              }
            }}
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors text-xs sm:text-sm"
          >
            +
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center text-xs sm:text-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-2 text-blue-800 hover:text-blue-600 transition-colors"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-xs sm:text-sm font-semibold sm:font-bold mb-2">
          File <span className="font-normal">{uploadingProjectImg ? "immagine" : "immagine, video"}</span>
          <span className="text-red-500"> *</span>
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full py-2 rounded-lg text-xs sm:text-sm cursor-pointer"
          accept="image/*,video/*"
        />
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          {uploadingProjectImg
            ? "Formati supportati: JPG, PNG, GIF, SVG"
            : "Formati supportati: JPG, PNG, GIF, SVG, MP4, MOV, AVI, WEBM"}
        </p>
      </div>

      {previewUrl && (
        <div className="mt-4 mb-6 flex flex-col items-center">
          <p className="text-xs sm:text-sm font-semibold sm:font-bold text-gray-700 mb-2">
            Anteprima:
          </p>
          {mediaType === "image" ? (
            <img
              src={previewUrl}
              alt="Anteprima"
              className="max-h-48 sm:max-h-60 max-w-full rounded-lg shadow"
            />
          ) : (
            <video
              src={previewUrl}
              controls
              className="max-h-48 sm:max-h-60 max-w-full rounded-lg shadow"
            />
          )}
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4">
        <button
          type="button"
          onClick={handleBackClick}
          className="
            p-2 text-gray-700 text-xs sm:text-sm w-full sm:w-auto truncate
            border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors
          "
        >
          {uploadingProjectImg ? "Annulla" : "Indietro"}
        </button>

        <button
          type="submit"
          disabled={mediaLoading}
          className={`p-2 rounded-lg font-medium text-xs sm:text-sm w-full sm:w-auto truncate ${
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

export default NewMediaForm;