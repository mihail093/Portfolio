import React, { useState, useEffect } from "react";
import { projectService } from "../../services/apiService";
import { Button } from "../ui";

const NewProjectForm = ({
  setUploadingProjectImg,
  setStep,
  uploadedProjectImg,
  setUploadedProjectImg,
  setMessage,
  showTemporaryMessage,
}) => {
  // Chiave unica per il localStorage
  const STORAGE_KEY = "portfolio_project_form";

  // Stati per gestire i dati del progetto
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    technologies: [],
    tags: [],
    imageUrl: "",
    githubUrl: "",
    liveUrl: "",
    featured: false,
  });

  // Stati per gestire UI
  const [techInput, setTechInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Carica i dati dal localStorage quando il componente si monta
  useEffect(() => {
    const loadStoredData = () => {
      try {
        // Tenta di recuperare e parsare l'intero oggetto projectData
        const storedData = localStorage.getItem(STORAGE_KEY);

        if (storedData) {
          const parsedData = JSON.parse(storedData);

          // Unisci i dati salvati con lo stato attuale
          setProjectData((prevData) => {
            const newData = {
              ...prevData,
              ...parsedData,
              // Si assicura che technologies sia sempre un array
              technologies: Array.isArray(parsedData.technologies)
                ? parsedData.technologies
                : [],
            };
            console.log("Nuovo stato dopo caricamento:", newData);
            return newData;
          });

          // Se c'è un'immagine salvata, aggiornala anche nello stato del genitore
          if (parsedData.imageUrl) {
            setUploadedProjectImg(parsedData.imageUrl);
          }

          console.log("Caricati dati dal localStorage:", parsedData);
        }
      } catch (error) {
        console.error(
          "Errore durante il recupero dei dati dal localStorage:",
          error
        );
      } finally {
        setDataLoaded(true);
      }
    };

    loadStoredData();
  }, [setUploadedProjectImg]);

  // Aggiorna il campo imageUrl quando uploadedProjectImg cambia
  useEffect(() => {
    if (uploadedProjectImg && dataLoaded) {
      setProjectData((prev) => ({
        ...prev,
        imageUrl: uploadedProjectImg,
      }));
    }
  }, [uploadedProjectImg, dataLoaded]);

  // Salva i dati nel localStorage ogni volta che projectData cambia
  useEffect(() => {
    // Evita di salvare finché i dati non sono stati caricati inizialmente
    if (!dataLoaded) return;

    try {
      // Salva l'intero oggetto projectData come JSON
      const dataToSave = JSON.stringify(projectData);
      localStorage.setItem(STORAGE_KEY, dataToSave);
      console.log("Salvati dati nel localStorage:", projectData);
    } catch (error) {
      console.error(
        "Errore durante il salvataggio dei dati nel localStorage:",
        error
      );
    }
  }, [projectData, dataLoaded]);

  // Gestisce il cambio dei campi del form
  const handleProjectChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProjectData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Gestisce l'aggiunta di una tecnologia
  const handleAddTech = () => {
    if (
      techInput.trim() &&
      !projectData.technologies.includes(techInput.trim())
    ) {
      setProjectData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()],
      }));
      setTechInput("");
    }
  };

  // Gestisce la rimozione di una tecnologia
  const handleRemoveTech = (tech) => {
    setProjectData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }));
  };

  // Gestisce l'aggiunta di un tag
  const handleAddTag = () => {
    if (
      tagInput.trim() &&
      !projectData.tags.includes(tagInput.trim())
    ) {
      setProjectData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  // Gestisce la rimozione di una tecnologia
  const handleRemoveTag = (tag) => {
    setProjectData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  // Gestisce il click sul bottone per caricare un'immagine
  const handleUploadImageClick = () => {
    setUploadingProjectImg(true);
    setStep(2);
  };

  // Invia i dati del progetto
  const handleProjectSubmit = async (e) => {
    e.preventDefault();

    // Validazione dei campi obbligatori
    if (!projectData.title || !projectData.description) {
      setMessage({
        text: "Compila i campi obbligatori (titolo e descrizione)",
        type: "warning",
      });
      return;
    }

    if (projectData.technologies.length === 0) {
      setMessage({ text: "Aggiungi almeno una tecnologia", type: "warning" });
      return;
    }

    if (projectData.tags.length === 0) {
      setMessage({ text: "Progetti e media vengono associati tramite tags, aggiungine almeno uno", type: "warning" });
      return;
    }

    if (!projectData.imageUrl) {
      setMessage({
        text: "Carica un'immagine copertina per il progetto",
        type: "warning",
      });
      return;
    }

    setLoading(true);
    setMessage({ text: "Creazione progetto in corso...", type: "info" });

    try {
      // Invia i dati del progetto al server
      await projectService.createProject(projectData);

      // Reset del form
      setProjectData({
        title: "",
        description: "",
        technologies: [],
        tags: [],
        imageUrl: "",
        githubUrl: "",
        liveUrl: "",
        featured: false,
      });

      // Reset dell'immagine caricata
      setUploadedProjectImg("");

      // Pulisci il localStorage
      localStorage.removeItem(STORAGE_KEY);

      showTemporaryMessage("Progetto creato con successo!", "success");
    } catch (error) {
      console.error("Errore creazione progetto:", error);
      setMessage({
        text: `Errore durante la creazione del progetto: ${
          error.response?.data?.error || error.message
        }`,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Funzione per pulire il form e il localStorage
  const handleResetForm = () => {
    // Reset del form
    setProjectData({
      title: "",
      description: "",
      technologies: [],
      tags: [],
      imageUrl: "",
      githubUrl: "",
      liveUrl: "",
      featured: false,
    });

    // Reset dell'immagine caricata
    setUploadedProjectImg("");

    // Pulisci il localStorage
    localStorage.removeItem(STORAGE_KEY);

    showTemporaryMessage("Form ripulito", "info");
  };

  return (
    <form
      onSubmit={handleProjectSubmit}
      className="bg-white shadow-md rounded-lg p-1 sm:p-2 md:p-3 mb-8 max-w-lg mx-auto w-full"
    >
      <div className="mb-4">
        <label className="block text-gray-700 text-xs sm:text-sm font-semibold sm:font-bold mb-2">
          Titolo Progetto <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          value={projectData.title}
          onChange={handleProjectChange}
          className="w-full px-2 sm:px-3 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
          placeholder="Titolo del progetto"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-xs sm:text-sm font-semibold sm:font-bold mb-2">
          Descrizione <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description"
          value={projectData.description}
          onChange={handleProjectChange}
          rows={4}
          className="w-full px-2 sm:px-3 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
          placeholder="Descrizione del progetto"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-xs sm:text-sm font-semibold sm:font-bold mb-2">
          Tecnologie <span className="text-red-500">*</span>
        </label>
        <div className="flex">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            className="w-0 min-w-0 flex-grow px-2 sm:px-3 py-2 border rounded-l-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
            placeholder="Aggiungi una tecnologia"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTech();
              }
            }}
          />
          <button
            type="button"
            onClick={handleAddTech}
            className="px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors text-xs sm:text-sm"
          >
            +
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {projectData.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center text-xs sm:text-sm"
            >
              {tech}
              <button
                type="button"
                onClick={() => handleRemoveTech(tech)}
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
          Tags <span className="text-red-500">*</span>
        </label>
        <div className="flex">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            className="w-0 min-w-0 flex-grow px-2 sm:px-3 py-2 border rounded-l-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
            placeholder="Associa progetto e media tramite tags"
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
          {projectData.tags.map((tag, index) => (
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
          Immagine copertina <span className="text-red-500">*</span>
        </label>

        <Button
          handleClick={handleUploadImageClick}
          label="carica"
        />

        {!projectData.imageUrl ? (
          <p className="text-gray-700 text-xs sm:text-sm italic mt-5 truncate">
            Nessuna immagine selezionata. Clicca "Carica immagine" per
            aggiungerne una.
          </p>
        ) : (
          <div className="mt-2">
            <p className="text-green-600 text-xs sm:text-sm font-medium mb-2">
              Immagine caricata con successo
            </p>
            <div className="relative group">
              <img
                src={projectData.imageUrl}
                alt="Immagine copertina"
                className="max-h-40 sm:max-h-48 max-w-full rounded-lg shadow-md transition-transform group-hover:scale-105"
              />
              <button
                type="button"
                onClick={() => {
                  setUploadedProjectImg("");
                  setProjectData((prev) => ({ ...prev, imageUrl: "" }));
                }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Rimuovi immagine"
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-xs sm:text-sm font-semibold sm:font-bold mb-2">
          URL GitHub
        </label>
        <input
          type="url"
          name="githubUrl"
          value={projectData.githubUrl}
          onChange={handleProjectChange}
          className="w-full px-2 sm:px-3 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
          placeholder="https://github.com/username/repository"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-xs sm:text-sm font-semibold sm:font-bold mb-2">
          URL Live
        </label>
        <input
          type="url"
          name="liveUrl"
          value={projectData.liveUrl}
          onChange={handleProjectChange}
          className="w-full px-2 sm:px-3 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
          placeholder="https://example.com"
        />
      </div>

      <div className="mb-6 flex items-center">
        <input
          type="checkbox"
          name="featured"
          id="featured"
          checked={projectData.featured}
          onChange={handleProjectChange}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
        />
        <label htmlFor="featured" className="ml-1 text-xs sm:text-sm text-gray-700 truncate">
          Progetto in evidenza
        </label>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4">
        <button
          type="button"
          onClick={handleResetForm}
          className="
            p-2 border border-gray-300 rounded-lg text-gray-700 text-xs sm:text-sm w-full sm:w-auto
            hover:bg-gray-50 transition-colors
          "
        >
          Cancella form
        </button>

        <button
          type="submit"
          disabled={loading}
          className={`p-2 rounded-lg font-medium text-xs sm:text-sm w-full sm:w-auto truncate ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          }`}
        >
          {loading ? "Creazione..." : "Crea Progetto"}
        </button>
      </div>
    </form>
  );
};

export default NewProjectForm;