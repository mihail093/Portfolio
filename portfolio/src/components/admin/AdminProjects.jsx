import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { projectService } from "../../services/apiService";
import AdminProjectsComponent from "./AdminProjectsComponent";
import AdminProjectDetailsComponent from "./AdminProjectDetailsComponent";
import AdminProjectEdit from "./AdminProjectEdit";

export default function AdminProjects() {
  // useNavigate viene usato nel caso non ci siano progetti, naviga alla pagina di creazione progetto
  const navigate = useNavigate();

  // useState per salvare immagini di copertina e titoli dei progetti (dati passati come prop ad AdminProjectsComponent)
  const [pages, setPages] = useState([]);

  // useState per salvare tutti i dati dei progetti (dati passati come prop ad AdminProjectDetailsComponent)
  const [projects, setProjects] = useState([]);

  // useState per gestire il progetto selezionato per i dettagli
  const [selectedProject, setSelectedProject] = useState(null);

  // useState per gestire la rimozione
  const [isRemoving, setIsRemoving] = useState(false);

  // useState per gestire il click sul bottone di modifica
  const [isEditButtonClicked, setIsEditButtonClicked] = useState(false);

  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const projectsData = await projectService.getProjects();
        if (
          projectsData &&
          projectsData.data &&
          Array.isArray(projectsData.data)
        ) {
          // Aggiorna tutti gli stati
          const newPages = projectsData.data.map((item, index) => ({
            id: item._id,
            title: item.title,
            imageUrl: item.imageUrl,
            projectIndex: index,
          }));

          setPages(newPages);
          setProjects(projectsData.data);

          // Gestisci il progetto selezionato
          if (selectedProject) {
            // Trova il progetto aggiornato
            const updatedSelectedProject = projectsData.data.find(
              project => project._id === selectedProject._id
            );
            if (updatedSelectedProject) {
              setSelectedProject(updatedSelectedProject);
            } else if (projectsData.data.length > 0) {
              setSelectedProject(projectsData.data[0]);
            } else {
              setSelectedProject(null);
            }
          } else if (projectsData.data.length > 0) {
            setSelectedProject(projectsData.data[0]);
          }
        }
      } catch (error) {
        console.error("Errore nel caricamento dei dati", error);
      }
    };

    fetchProjectsData();
  }, [isEditButtonClicked]);

  // Funzione per gestire la selezione di un progetto dalle pagine
  const handleProjectSelect = (pageIndex) => {
    if (projects && projects[pageIndex]) {
      setSelectedProject(projects[pageIndex]);
    } else if (projects && projects.length > 0) {
      setSelectedProject(projects[0]);
    } else {
      setSelectedProject(null);
    }
  };

  // Funzione per gestire la rimozione di un progetto
  const handleProjectRemoved = async (removedId) => {
    // Mostra stato di caricamento
    setIsRemoving(true);

    try {
      // Filtra gli array
      const updatedProjects = projects.filter((item) => item._id !== removedId);
      const updatedPages = pages.filter((item) => item.id !== removedId);

      // Aggiorna gli stati
      setProjects(updatedProjects);
      setPages(updatedPages);

      // Gestisci il progetto selezionato
      if (selectedProject && selectedProject._id === removedId) {
        if (updatedProjects.length > 0) {
          setSelectedProject(updatedProjects[0]);
        } else {
          setSelectedProject(null);
        }
      }

      console.log(
        `Progetto rimosso. Progetti rimanenti: ${updatedProjects.length}`
      );
    } catch (error) {
      console.error("Errore nella gestione della rimozione:", error);
    } finally {
      setIsRemoving(false);
    }
  };

  // Gestisci il caso quando non ci sono progetti
  if (projects.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-64 space-y-4 px-2">
        <div className="p-2 sm:p-4 text-center rounded-md bg-black/70 select-none w-full max-w-md">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">
            Nessun progetto trovato
          </h2>
          <p className="text-gray-200 text-sm sm:text-base">
            Inizia creando il tuo primo progetto!
          </p>
        </div>
        <button
          className="px-4 sm:px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 active:bg-indigo-700 transition-colors w-full max-w-xs"
          onClick={() => {
            navigate("/admin/manager");
          }}
        >
          Crea Nuovo Progetto
        </button>
      </div>
    );
  }

  return (
    <>
      {isEditButtonClicked ? (
        <AdminProjectEdit 
          selectedProject={selectedProject}
          setIsEditButtonClicked={setIsEditButtonClicked}
        />
      ) : (
        <div className="space-y-72 h-screen px-2 sm:px-4 md:px-8 py-4">
          <div className="h-auto md:h-2/3 bg-white/5 backdrop-blur-2xl backdrop-brightness-105 backdrop-opacity-90 rounded-lg">
            <div className="flex flex-col justify-center items-center text-black font-montserrat p-2 sm:p-3">
              <h2 className="text-md sm:text-lg font-semibold text-center">
                Sfoglia i tuoi progetti
              </h2>
              <p className="text-xs sm:text-base text-center">
                Clicca su una pagina per visualizzare i dettagli del progetto
              </p>
            </div>

            {/* Componente libro con callback per selezione */}
            <AdminProjectsComponent
              pages={pages}
              onProjectSelect={handleProjectSelect}
            />
          </div>

          <div className="h-auto md:h-1/3">
            {/* Mostra un messaggio di caricamento durante la rimozione */}
            {isRemoving && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto"></div>
                  <p className="mt-4 text-center">Eliminazione in corso...</p>
                </div>
              </div>
            )}

            <AdminProjectDetailsComponent
              project={selectedProject}
              onProjectRemoved={handleProjectRemoved}
              setIsEditButtonClicked={setIsEditButtonClicked}
            />
          </div>
        </div>
      )}
    </>
  );
}