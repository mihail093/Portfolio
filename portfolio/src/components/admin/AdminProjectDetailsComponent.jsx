import React, { useState } from 'react';
import { projectService } from '../../services/apiService';
import { ResponsiveCloudinaryImage, Modal } from '../ui';
import { 
  CalendarIcon, 
  StarIcon, 
  CodeBracketIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';
import { 
  StarIcon as StarIconSolid 
} from '@heroicons/react/24/solid';

export default function AdminProjectDetailsComponent({ project, onProjectRemoved, setIsEditButtonClicked }) {
  // Stato per il modal di conferma eliminazione
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    projectToDelete: null,
    isDeleting: false,
  });

  // Funzione per aprire il modal di conferma eliminazione
  const handleRemoveClick = (project) => {
    setDeleteModal({
      isOpen: true,
      projectToDelete: project,
      isDeleting: false,
    });
  };

  // Funzione per chiudere il modal di eliminazione
  const handleCloseDeleteModal = () => {
    if (!deleteModal.isDeleting) {
      setDeleteModal({
        isOpen: false,
        projectToDelete: null,
        isDeleting: false,
      });
    }
  };

  // Funzione per confermare l'eliminazione
  const handleConfirmDelete = async () => {
    if (!deleteModal.projectToDelete) return;

    setDeleteModal((prev) => ({ ...prev, isDeleting: true }));

    try {
      const projectId = deleteModal.projectToDelete._id;
      console.log("Removing media with ID:", projectId);

      await projectService.deleteProject(projectId);

      // Notifica il componente padre della rimozione
      if (onProjectRemoved) {
        onProjectRemoved(projectId);
      }

      console.log("Project removed successfully");

      // Chiudi il modal
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Errore nella rimozione del progetto", error);
      alert("Errore nella rimozione del progetto: " + error.message);

      // Reset dello stato di caricamento in caso di errore
      setDeleteModal((prev) => ({ ...prev, isDeleting: false }));
    }
  };

  // Se non c'è un progetto, mostra un placeholder
  if (!project) {
    return (
      <div className='flex justify-center items-center'>
        <div className="flex items-center px-2 w-max min-h-10 bg-white rounded-lg text-black">
          <p className="w-max text-lg text-center">
            Seleziona un progetto per visualizzarne i dettagli
          </p>
        </div>
      </div>
    );
  }

  // Formatta la data di creazione
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="relative flex flex-col lg:flex-row flex-wrap justify-center items-center gap-6 p-2 border-2 border-black bg-[#f1faee] rounded-lg shadow-lg w-full max-w-5xl mx-auto">
      {/* Header con immagine di copertina, titolo e ID progetto*/}
      <div className="w-full max-w-xs mx-auto">
        {/* Titolo e ID */}
        <div className="my-8">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 text-center lg:text-left truncate">
            {project.title}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 font-mono text-center lg:text-left break-words">
            ID: {project._id}
          </p>
        </div>

        {/* Immagine */}
        <ResponsiveCloudinaryImage
          imageUrl={project.imageUrl}
          alt={project.title}
          className="w-full max-w-xs h-auto aspect-square border-4 border-[#b1e89d] mx-auto"
        />

        {/* Badge se il progetto è in evidenza */}
        {project.featured && (
          <div
            className="
              absolute top-2 right-2 flex items-center gap-1 px-1 py-1 select-none
              sm:px-3 text-yellow-500
              sm:bg-yellow-400 sm:text-white sm:border-2 sm:border-gray-600 sm:rounded-md
            "
          >
            <StarIconSolid className="w-4 h-4" aria-hidden="true" />
            <span className="text-xs text-black md:text-sm hidden sm:block">In evidenza</span>
          </div>
        )}
      </div>

      {/* Informazioni */}
      <div className="w-full max-w-md p-2 sm:p-4 space-y-4">
        {/* Tecnologie utilizzate */}
        <div>
          <h2 className="text-md sm:text-lg font-semibold text-gray-800 mb-2 truncate">
            Tecnologie utilizzate
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm border border-blue-200 truncate"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Informazioni aggiuntive */}
        <div className="bg-[#f8edeb] rounded-lg p-2 sm:p-4">
          <h3 className="text-sm sm:text-md text-black mb-2 truncate">
            Info aggiuntive
          </h3>
          <div className="space-y-2">
            {/* Stato evidenza */}
            <div className="flex items-center gap-2">
              {project.featured ? (
                <>
                  <StarIconSolid className="hidden sm:block w-5 h-5 text-yellow-500" aria-hidden="true" />
                  <span className="text-green-700 bg-[#e1edde] text-xs sm:text-sm truncate">
                    Progetto in evidenza
                  </span>
                </>
              ) : (
                <>
                  <StarIcon className="hidden sm:block w-5 h-5 text-gray-400" aria-hidden="true" />
                  <span className="text-gray-600 text-xs sm:text-sm truncate">
                    Progetto non in evidenza
                  </span>
                </>
              )}
            </div>
            {/* Data di creazione */}
            <div className="flex items-center gap-2 text-gray-600">
              <CalendarIcon className="hidden sm:block w-5 h-5" aria-hidden="true" />
              <span className="text-xs sm:text-sm truncate">
                Creato il: {formatDate(project.createdAt)}
              </span>
            </div>
            {/* URL GitHub */}
            <div className="flex items-center gap-2">
              <CodeBracketIcon className="hidden sm:block w-5 h-5 text-gray-600" aria-hidden="true" />
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline transition-colors text-xs sm:text-sm truncate"
                >
                  Repository GitHub
                </a>
              ) : (
                <span className="text-gray-500 text-xs sm:text-sm truncate">
                  Repository GitHub non disponibile
                </span>
              )}
            </div>
            {/* URL Live */}
            <div className="flex items-center gap-2">
              <GlobeAltIcon className="hidden sm:block w-5 h-5 text-gray-600" aria-hidden="true" />
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-800 hover:underline transition-colors text-xs sm:text-sm truncate"
                >
                  Sito live
                </a>
              ) : (
                <span className="text-gray-500 text-xs sm:text-sm truncate">
                  Sito live non disponibile
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Descrizione e bottoni gestione (modifica/elimina)*/}
      <div className="w-full p-2 sm:p-4 flex flex-col">
        <div className="mb-4">
          <h2 className="text-md sm:text-lg font-semibold text-gray-800 mb-2 truncate">
            Descrizione
          </h2>
          <div className="max-h-40 overflow-y-auto">
            <p className="pe-4 text-xs sm:text-sm text-gray-700 leading-relaxed break-words">
              {project.description}
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-end items-end gap-2 mt-4">
          <button
            type="button"
            className="
              p-0 sm:px-2 sm:py-1 text-xs sm:text-sm font-semibold 
              border-2 border-yellow-800 bg-yellow-200 truncate
              hover:bg-yellow-300 active:bg-yellow-500 rounded-md shadow-sm transition-colors duration-200 w-full sm:w-auto
            "
            onClick={() => setIsEditButtonClicked(true)}
          >
            modifica
          </button>
          <button
            type="button"
            className="
              p-0 sm:px-2 sm:py-1 text-xs sm:text-sm font-semibold 
              border-2 border-red-800 bg-red-200 truncate
              hover:bg-red-300 active:bg-red-500 rounded-md shadow-sm transition-colors duration-200 w-full sm:w-auto
            "
            onClick={() => handleRemoveClick(project)}
          >
            elimina
          </button>
        </div>
      </div>

      {/* Modal di conferma eliminazione */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={handleCloseDeleteModal}
        type="delete"
        title="Conferma eliminazione"
        showActions={true}
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDeleteModal}
        confirmText="Elimina"
        cancelText="Annulla"
        isConfirmLoading={deleteModal.isDeleting}
      >
        <div className="px-2 sm:px-4">
          <p className="text-white text-sm sm:text-md mb-2 pt-1 select-none">
            Sei sicuro di voler eliminare questo progetto?
          </p>
          {deleteModal.projectToDelete && (
            <p className="w-fit font-semibold text-orange-500 bg-black/40 px-2 sm:px-3 py-2 rounded-lg">
              {deleteModal.projectToDelete.title}
            </p>
          )}
          <p className="text-xs sm:text-sm text-yellow-400 mt-2 select-none">
            <span className="text-lg">⚠️</span>
            Questa azione non può essere annullata.
          </p>
        </div>
      </Modal>
    </div>
  );
}