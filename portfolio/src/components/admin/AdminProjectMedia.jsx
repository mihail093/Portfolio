import React, { useState } from "react";
import { mediaService } from "../../services/apiService";
import { ResponsiveCloudinaryImage, VideoWithThumbnail, Modal } from "../ui";
import MediaViewModal from "./MediaViewModal";

export default function AdminProjectMedia({ projectMedia, onMediaRemoved }) {
  // Stato per il modal di conferma eliminazione
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    mediaToDelete: null,
    isDeleting: false,
  });

  // Stato per il modal di visualizzazione media
  const [viewModal, setViewModal] = useState({
    isOpen: false,
    mediaToView: null,
  });

  // Funzione per aprire il modal di visualizzazione
  const handleViewMedia = (media) => {
    setViewModal({
      isOpen: true,
      mediaToView: media,
    });
  };

  // Funzione per chiudere il modal di visualizzazione
  const handleCloseViewModal = () => {
    setViewModal({
      isOpen: false,
      mediaToView: null,
    });
  };

  // Funzione per aprire il modal di conferma eliminazione
  const handleRemoveClick = (media) => {
    setDeleteModal({
      isOpen: true,
      mediaToDelete: media,
      isDeleting: false,
    });
  };

  // Funzione per chiudere il modal di eliminazione
  const handleCloseDeleteModal = () => {
    if (!deleteModal.isDeleting) {
      setDeleteModal({
        isOpen: false,
        mediaToDelete: null,
        isDeleting: false,
      });
    }
  };

  // Funzione per confermare l'eliminazione
  const handleConfirmDelete = async () => {
    if (!deleteModal.mediaToDelete) return;

    setDeleteModal((prev) => ({ ...prev, isDeleting: true }));

    try {
      const mediaId = deleteModal.mediaToDelete._id;
      console.log("Removing media with ID:", mediaId);

      await mediaService.deleteMedia(mediaId);

      // Notifica il componente padre della rimozione
      if (onMediaRemoved) {
        onMediaRemoved(mediaId, "project");
      }

      console.log("Media removed successfully");

      // Chiudi il modal
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Errore nella rimozione del media", error);
      alert("Errore nella rimozione del media: " + error.message);

      // Reset dello stato di caricamento in caso di errore
      setDeleteModal((prev) => ({ ...prev, isDeleting: false }));
    }
  };

  // Se non ci sono media, mostra un messaggio
  if (!projectMedia || projectMedia.length === 0) {
    return (
      <div className="flex flex-col items-center text-gray-200 text-center">
        <p className="p-4 w-fit bg-black/60 rounded-md text-lg">
          Nessun media di categoria "altro" trovato
        </p>
        <p className="mt-2 p-2 w-fit text-sm bg-black/60 rounded-md">
          Carica delle immagini o video per questa categoria
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 px-1 sm:px-2 md:px-4">
        {projectMedia.map((item) => (
          <div
            key={item._id}
            className="flex flex-col items-center gap-2 bg-[#353535]/40 rounded-lg p-2 sm:p-3 md:p-4 shadow-md"
          >
            <h3 className="p-1 text-sm sm:text-base text-white bg-[#353535] text-center rounded-md w-full truncate">
              {item.title}
            </h3>

            {item.mediaType === "image" ? (
              <div className="flex flex-col justify-between h-full">
                <div className="relative group cursor-pointer w-full min-h-[80px]">
                  <ResponsiveCloudinaryImage
                    imageUrl={item.mediaUrl}
                    alt={item.title}
                    className="w-full rounded-md shadow-sm transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded-md" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="bg-black bg-opacity-75 text-white px-2 py-1 rounded-full text-xs sm:text-sm"
                      onClick={() => handleViewMedia(item)}
                    >
                      Clicca per ingrandire
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveClick(item)}
                  className="
                  mt-1 px-2 py-1 text-xs sm:text-sm font-semibold text-white bg-red-600 rounded-md shadow-sm truncate
                  hover:bg-red-700 transition-colors duration-200 w-full
                "
                >
                  Rimuovi
                </button>
              </div>
            ) : (
              <div className="flex flex-col justify-between h-full">
                <div className="flex flex-col justify-between group cursor-pointer w-full min-h-[80px]">
                  <VideoWithThumbnail
                    videoUrl={item.mediaUrl}
                    title={item.title}
                    className="w-full rounded-md"
                  />
                  <button
                    className="
                      bg-black/70 text-white px-2 py-1 rounded text-xs
                      opacity-0 group-hover:opacity-100 transition-opacity
                    "
                    onClick={() => handleViewMedia(item)}
                  >
                    Info
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveClick(item)}
                  className="
                  mt-1 px-2 py-1 text-xs sm:text-sm font-semibold text-white bg-red-600 rounded-md shadow-sm truncate
                  hover:bg-red-700 transition-colors duration-200 w-full
                "
                >
                  Rimuovi
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal di visualizzazione media */}
      <MediaViewModal
        isOpen={viewModal.isOpen}
        onClose={handleCloseViewModal}
        media={viewModal.mediaToView}
      />

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
            Sei sicuro di voler eliminare questo media?
          </p>
          {deleteModal.mediaToDelete && (
            <p className="w-fit font-semibold text-orange-500 bg-black/40 px-2 sm:px-3 py-2 rounded-lg">
              {deleteModal.mediaToDelete.title}
            </p>
          )}
          <p className="text-xs sm:text-sm text-yellow-400 mt-2 select-none">
            <span className="text-lg">⚠️</span>
            Questa azione non può essere annullata.
          </p>
        </div>
      </Modal>
    </>
  );
}
