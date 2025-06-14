import React, { useState, useRef } from "react";
import { PlayIcon } from "@heroicons/react/24/solid";

export default function VideoWithThumbnail({
  videoUrl,
  thumbnailUrl,
  title,
  className = "",
  onClick,
  ...props
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef(null);

  // Funzione per gestire il click su play
  const handlePlayClick = (e) => {
    e.stopPropagation();
    setIsLoading(true);
    setShowVideo(true);
  };

  // Gestione eventi video: caricamento, riproduzione, errore 
  const handleVideoLoadStart = () => {
    setIsLoading(true);
  };

  const handleVideoCanPlay = () => {
    setIsLoading(false);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleVideoError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Funzione per generare thumbnail automatico da Cloudinary
  const getAutoThumbnail = (url) => {
    if (!url || !url.includes("cloudinary.com")) return null;

    return url
      .replace(
        "/video/upload/",
        "/video/upload/w_400,h_171,c_fill,q_auto,f_auto,so_0/"
      )
      .replace(/\.[^.]+$/, ".jpg");
  };

  const finalThumbnailUrl = getAutoThumbnail(videoUrl);

  return (
    <div className={`relative ${className}`} onClick={onClick}>
      {!showVideo ? (
        // Thumbnail view
        <div className="relative w-full">
          {finalThumbnailUrl ? (
            <img
              src={finalThumbnailUrl}
              alt={title}
              className="w-full rounded-md shadow-sm object-cover"
              style={{ aspectRatio: "21/9" }}
            />
          ) : (
            // Fallback se non c'è thumbnail
            <div
              className="w-full bg-gray-200 rounded-md shadow-sm flex items-center justify-center"
              style={{ aspectRatio: "21/9" }}
            >
              <div className="text-center">
                <PlayIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Video Preview</p>
              </div>
            </div>
          )}

          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-md hover:bg-opacity-30 transition-all">
            <button
              onClick={handlePlayClick}
              className="p-1 sm:p-2 md:p-4 bg-white/90 rounded-full hover:bg-white hover:scale-105 transition-all transform"
            >
              <PlayIcon className="h-8 w-8 text-blue-600" />
            </button>
          </div>
        </div>
      ) : (
        // Video view
        <div className="relative w-full">
          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md z-10">
              <div className="bg-white rounded-lg p-4 flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="text-sm">Caricamento video...</span>
              </div>
            </div>
          )}

          {/* Error state */}
          {hasError && (
            <div className="absolute inset-0 bg-red-50 flex items-center justify-center rounded-md z-10">
              <div className="text-center p-4">
                <p className="text-red-600 mb-2">⚠️ Errore nel caricamento</p>
                <button
                  onClick={() => {
                    setHasError(false);
                    setShowVideo(false);
                  }}
                  className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Riprova
                </button>
              </div>
            </div>
          )}

          <video
            ref={videoRef}
            src={videoUrl}
            controls
            className="w-full rounded-md shadow-sm"
            onLoadStart={handleVideoLoadStart}
            onCanPlay={handleVideoCanPlay}
            onError={handleVideoError}
            onClick={(e) => e.stopPropagation()}
            {...props}
          />
        </div>
      )}
    </div>
  );
}