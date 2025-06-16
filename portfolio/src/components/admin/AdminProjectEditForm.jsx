import React, { useState, useEffect } from "react";
import { projectService } from "../../services/apiService";
import { Button } from "../ui";

const AdminProjectEditForm = ({
  setIsProjectForm,
  setIsEditButtonClicked,
  uploadedProjectImg,
  setUploadedProjectImg,
  selectedProject,
  setMessage,
  showTemporaryMessage,
}) => {
  // Chiave unica per il localStorage con ID progetto
  const STORAGE_KEY = `portfolio_project_edit_form_${selectedProject._id}`;

  // Inizializza lo stato con selectedProject
  const [projectData, setProjectData] = useState({
    title: selectedProject?.title || "",
    description: selectedProject?.description || "",
    technologies: selectedProject?.technologies || [],
    tags: selectedProject?.tags || [],
    imageUrl: selectedProject?.imageUrl || "",
    githubUrl: selectedProject?.githubUrl || "",
    liveUrl: selectedProject?.liveUrl || "",
    featured: selectedProject?.featured || false,
  });

  // Stati per gestire UI
  const [techInput, setTechInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  // useEffect per gestire il caricamento iniziale
  useEffect(() => {
    const initializeForm = () => {
      try {
        // Prima controlla se ci sono dati salvati nel localStorage per questo progetto specifico
        const storedData = localStorage.getItem(STORAGE_KEY);

        if (storedData) {
          const parsedData = JSON.parse(storedData);

          // Usa i dati dal localStorage se disponibili
          setProjectData({
            ...parsedData,
            // Si assicura che technologies sia sempre un array
            technologies: Array.isArray(parsedData.technologies)
              ? parsedData.technologies
              : selectedProject?.technologies || [],
            
            // Si assicura che tags sia sempre un array
            tags: Array.isArray(parsedData.tags)
              ? parsedData.tags
              : selectedProject?.tags || [],
          });

          // Aggiorna anche l'immagine se presente
          if (uploadedProjectImg) {
            setProjectData((prev) => ({
              ...prev,
              imageUrl: uploadedProjectImg,
            }));
          } else {
            setProjectData((prev) => ({
              ...prev,
              imageUrl: parsedData.imageUrl,
            }));
          }
        } else {
          // Se non ci sono dati nel localStorage, usa selectedProject
          setProjectData({
            title: selectedProject?.title || "",
            description: selectedProject?.description || "",
            technologies: selectedProject?.technologies || [],
            tags: selectedProject?.tags || [],
            imageUrl: selectedProject?.imageUrl || "",
            githubUrl: selectedProject?.githubUrl || "",
            liveUrl: selectedProject?.liveUrl || "",
            featured: selectedProject?.featured || false,
          });

          // Imposta anche l'immagine corrente
          if (selectedProject?.imageUrl) {
            setUploadedProjectImg(selectedProject.imageUrl);
          }
        }
      } catch (error) {
        // In caso di errore, usa selectedProject come fallback
        setProjectData({
          title: selectedProject?.title || "",
          description: selectedProject?.description || "",
          technologies: selectedProject?.technologies || [],
          tags: selectedProject?.tags || [],
          imageUrl: selectedProject?.imageUrl || "",
          githubUrl: selectedProject?.githubUrl || "",
          liveUrl: selectedProject?.liveUrl || "",
          featured: selectedProject?.featured || false,
        });
      } finally {
        setDataLoaded(true);
      }
    };

    // Inizializza solo se abbiamo selectedProject
    if (selectedProject && selectedProject._id) {
      initializeForm();
    }
  }, [selectedProject, STORAGE_KEY, setUploadedProjectImg]);

  // Salva i dati nel localStorage ogni volta che projectData cambia
  useEffect(() => {
    // Evita di salvare finché i dati non sono stati caricati inizialmente
    if (!dataLoaded || !selectedProject?._id) return;

    try {
      // Salva l'intero oggetto projectData come JSON
      const dataToSave = JSON.stringify(projectData);
      localStorage.setItem(STORAGE_KEY, dataToSave);
    } catch (error) {
      console.error(
        "Errore durante il salvataggio dei dati nel localStorage:",
        error
      );
    }
  }, [projectData, dataLoaded, STORAGE_KEY, selectedProject]);

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

  // Gestisce la rimozione di un tag
  const handleRemoveTag = (tag) => {
    setProjectData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  // Gestisce il click sul bottone per caricare un'immagine
  const handleUploadImageClick = () => {
    setIsProjectForm(false);
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
      setMessage({ text: "Aggiungi almeno un tag", type: "warning" });
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
    setMessage({ text: "Modifica progetto in corso...", type: "info" });

    try {
      // Invia i dati modificati
      await projectService.updateProject(selectedProject._id, projectData);

      // Pulisci il localStorage per questo progetto
      localStorage.removeItem(STORAGE_KEY);

      showTemporaryMessage("Progetto modificato con successo!", "success");

      // Torna alla lista progetti
      setTimeout(() => {
        setIsEditButtonClicked(false);
      }, 2000);
    } catch (error) {
      console.error("Errore modifica progetto:", error);
      setMessage({
        text: `Errore durante la modifica del progetto: ${
          error.response?.data?.error || error.message
        }`,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Funzione per resettare ai valori originali di selectedProject
  const handleResetForm = () => {
    setProjectData({
      title: selectedProject?.title || "",
      description: selectedProject?.description || "",
      technologies: selectedProject?.technologies || [],
      tags: selectedProject?.tags || [],
      imageUrl: selectedProject?.imageUrl || "",
      githubUrl: selectedProject?.githubUrl || "",
      liveUrl: selectedProject?.liveUrl || "",
      featured: selectedProject?.featured || false,
    });

    // Reset dell'immagine caricata ai valori originali
    setUploadedProjectImg(selectedProject?.imageUrl || "");

    // Pulisci il localStorage
    localStorage.removeItem(STORAGE_KEY);

    showTemporaryMessage("Form resettato ai valori originali", "info");
  };

  // Mostra loading se i dati non sono ancora caricati
  if (!dataLoaded) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-white">Caricamento dati progetto...</span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleProjectSubmit}
      className="relative bg-[#f1faee] shadow-md rounded-lg p-3 sm:p-4 md:p-6 mb-8 max-w-lg mx-auto w-full z-10"
    >
      <div className="mb-4">
        <label className="block text-gray-700 text-xs sm:text-sm font-bold mb-2">
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
        <label className="block text-gray-700 text-xs sm:text-sm font-bold mb-2">
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
        <label className="block text-gray-700 text-xs sm:text-sm font-bold mb-2">
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
        <label className="block text-gray-700 text-xs sm:text-sm font-bold mb-2">
          Tags <span className="text-red-500">*</span>
        </label>
        <div className="flex">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            className="w-0 min-w-0 flex-grow px-2 sm:px-3 py-2 border rounded-l-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
            placeholder="Aggiungi un tag"
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
        <label className="block text-gray-700 text-xs sm:text-sm font-bold mb-2">
          Immagine copertina <span className="text-red-500">*</span>
        </label>

        <div className="mb-4">
          <Button
            handleClick={handleUploadImageClick}
            label="Carica nuova immagine"
          />
        </div>

        {!projectData.imageUrl ? (
          <p className="text-gray-700 text-xs sm:text-sm italic">
            Nessuna immagine selezionata. Clicca "Carica nuova immagine" per
            aggiungerne una.
          </p>
        ) : (
          <div className="mt-2">
            <p className="text-green-600 text-xs sm:text-sm font-medium mb-2">
              Immagine presente
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
        <label className="block text-gray-700 text-xs sm:text-sm font-bold mb-2">
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
        <label className="block text-gray-700 text-xs sm:text-sm font-bold mb-2">
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
        <label
          htmlFor="featured"
          className="ml-2 text-xs sm:text-sm text-gray-700"
        >
          Progetto in evidenza
        </label>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4">
        <button
          type="button"
          onClick={() => setIsEditButtonClicked(false)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-xs sm:text-sm w-full sm:w-auto"
        >
          Annulla
        </button>

        <button
          type="button"
          onClick={handleResetForm}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-xs sm:text-sm w-full sm:w-auto"
        >
          Ripristina originale
        </button>

        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-2 rounded-lg font-medium text-xs sm:text-sm w-full sm:w-auto ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white transition-colors"
          }`}
        >
          {loading ? "Salvando..." : "Salva Modifiche"}
        </button>
      </div>
    </form>
  );
};

export default AdminProjectEditForm;