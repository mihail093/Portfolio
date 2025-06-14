import React from "react";
import {
  XMarkIcon,
  CalendarIcon,
  TagIcon,
  FolderIcon,
} from "@heroicons/react/24/outline";
import { ResponsiveCloudinaryImage } from "../ui";

export default function MediaViewModal({ isOpen, onClose, media }) {
  if (!isOpen || !media) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getMediaTypeIcon = (mediaType) => {
    switch (mediaType) {
      case "image":
        return "🖼️";
      case "video":
        return "🎥";
      default:
        return "📄";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "project":
        return "bg-blue-100 text-blue-800";
      case "other":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        {/* Modal Content */}
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-scroll">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {media.title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Content */}
          <div className="flex flex-col lg:flex-row">
            {/* Media Display */}
            <div className="flex-1 p-6 bg-gray-50 flex items-center justify-center">
              {media.mediaType === "image" ? (
                <div className="max-w-full max-h-[80vh]">
                  <ResponsiveCloudinaryImage
                    imageUrl={media.mediaUrl}
                    alt={media.title}
                    className="rounded-lg shadow-lg max-w-full max-h-full object-contain"
                  />
                </div>
              ) : (
                <video
                  src={media.mediaUrl}
                  controls
                  className="rounded-lg shadow-lg max-w-full max-h-[60vh]"
                  title={media.title}
                />
              )}
            </div>

            {/* Information Panel */}
            <div className="w-full lg:w-80 p-6 bg-white border-l border-gray-200">
              <div className="space-y-6">
                {/* Media Type e Category */}
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                    <span className="mr-1">
                      {getMediaTypeIcon(media.mediaType)}
                    </span>
                    {media.mediaType || "N/A"}
                  </span>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${getCategoryColor(
                      media.category
                    )}`}
                  >
                    <FolderIcon className="w-4 h-4 mr-1" aria-hidden="true" />
                    {media.category || "N/A"}
                  </span>
                </div>

                {/* Informazioni dettagliate */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Titolo
                    </label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded">
                      {media.title || "Nessun titolo"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <CalendarIcon className="w-4 h-4 inline mr-1" aria-hidden="true" />
                      Data caricamento
                    </label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded">
                      {media.createdAt ? formatDate(media.createdAt) : "N/A"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ID Media
                    </label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded text-xs font-mono">
                      {media._id || "N/A"}
                    </p>
                  </div>

                  {/* URL completo (se necessario per debug) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      URL originale
                    </label>
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-xs text-gray-600 break-all font-mono">
                        {media.mediaUrl || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Cloudinary ID se disponibile */}
                  {media.cloudinaryId && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <TagIcon className="w-4 h-4 inline mr-1" aria-hidden="true" />
                        Cloudinary ID
                      </label>
                      <p className="text-gray-900 bg-gray-50 p-2 rounded text-xs font-mono">
                        {media.cloudinaryId}
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="border-t border-gray-200 pt-4">
                  <button
                    onClick={() => window.open(media.mediaUrl, "_blank")}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                  >
                    Apri in nuova finestra
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}