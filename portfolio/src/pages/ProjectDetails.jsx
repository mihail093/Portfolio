import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mediaService } from "../services/apiService";
import { useTheme } from "../context/ThemeContext";
import { ResponsiveCloudinaryImage } from "../components/ui";
import {
  StarIcon,
  CodeBracketIcon,
  GlobeAltIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import CarouselMedia from "../components/layout/CarouselMedia";

export default function ProjectDetails() {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  // useState per gestire il caricamento
  const [isLoading, setIsLoading] = useState(true);

  // useState per salvare i dati
  const [projectData, setProjectData] = useState({ technologies: [], tags: [] });
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
  const loadStoredData = async () => {
    try {
      setIsLoading(true);
      const storedData = localStorage.getItem("portfolio_project_details");
      
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const newProjectData = {
          ...parsedData,
          technologies: Array.isArray(parsedData.technologies)
            ? parsedData.technologies
            : [],
          tags: Array.isArray(parsedData.tags)
            ? parsedData.tags
            : [],
        };
        
        // Prima aggiorna lo stato
        setProjectData(newProjectData);
        
        // Poi carica i media usando i tag appena parsati
        if (newProjectData.tags && newProjectData.tags.length > 0) {
          try {
            const mediaData = await mediaService.getMediaByTags(newProjectData.tags);
            if (mediaData && mediaData.data && Array.isArray(mediaData.data)) {
              // Filtra immagini e video
              const imageData = mediaData.data.filter(
                (item) => item.mediaType === "image"
              );
              const videoData = mediaData.data.filter(
                (item) => item.mediaType === "video"
              );

              // Salva nei rispettivi useState
              setImages(imageData);
              setVideos(videoData);
            }
          } catch (error) {
            console.error("Errore nel caricamento dei media", error);
          }
        }
      } else {
        // fallback se non ci sono dati
        setProjectData({ technologies: [], tags: [] });
      }
    } catch (error) {
      console.error("Errore durante il recupero dei dati", error);
      setProjectData({ technologies: [], tags: [] });
    } finally {
      setIsLoading(false);
    }
  };

  loadStoredData();
}, []);

  return (
    <>
      <div
        className={`
          relative flex flex-col justify-center items-center gap-6 
          p-2 border-2 rounded-lg shadow-lg w-full max-w-5xl mx-auto
          ${isDark ? "bg-white/30 border-black" : "bg-blue-400/20 border-blue-200"}
        `}
      >
        {/* Header con immagine di copertina e titolo*/}
        <div className="w-full mx-auto">
          {/* Titolo */}
          <h1 className="
                text-2xl sm:text-3xl md:text-4xl font-lobster font-bold text-center
                my-8 select-none truncate
              "
          >
            {projectData.title}
          </h1>

          {/* Immagine */}
          <ResponsiveCloudinaryImage
            imageUrl={projectData.imageUrl}
            alt={projectData.title}
            className="w-full h-auto mx-auto"
          />

          {/* Badge se il progetto è in evidenza */}
          {projectData.featured && (
            <div
              className="
                absolute top-2 right-2 flex items-center gap-1 px-1 py-1 select-none
                sm:px-3 text-yellow-500
                sm:bg-yellow-400 sm:text-white sm:border-2 sm:border-gray-600 sm:rounded-md
              "
            >
              <StarIconSolid className="w-4 h-4" aria-hidden="true" />
              <span className="text-xs text-black md:text-sm hidden sm:block">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Informazioni */}
        <div className="w-full p-2 sm:p-4 space-y-4">
          {/* Tecnologie utilizzate */}
          <div className="select-none">
            <h2 className="text-md sm:text-lg font-semibold text-gray-800 mb-2 truncate">
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-2">
              {projectData.technologies.map((tech, index) => (
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
          <div className="w-fit bg-[#f8edeb] rounded-lg p-2 sm:p-4">
            <h3 className="text-sm sm:text-md text-black mb-2 select-none truncate">
              Additional Information
            </h3>
            <div className="space-y-2">
              {/* Stato evidenza */}
              <div className="flex items-center gap-2 select-none">
                {projectData.featured ? (
                  <>
                    <StarIconSolid
                      className="hidden sm:block w-5 h-5 text-yellow-500"
                      aria-hidden="true"
                    />
                    <span className="text-green-700 bg-[#e1edde] text-xs sm:text-sm truncate">
                      Featured Project
                    </span>
                  </>
                ) : (
                  <>
                    <StarIcon
                      className="hidden sm:block w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="text-gray-600 text-xs sm:text-sm truncate">
                      Non-Featured Project
                    </span>
                  </>
                )}
              </div>
              {/* URL GitHub */}
              <div className="flex items-center gap-2">
                <CodeBracketIcon
                  className="hidden sm:block w-5 h-5 text-gray-600"
                  aria-hidden="true"
                />
                {projectData.githubUrl ? (
                  <a
                    href={projectData.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline transition-colors text-xs sm:text-sm truncate"
                  >
                    Repository GitHub
                  </a>
                ) : (
                  <span className="text-gray-500 text-xs sm:text-sm select-none truncate">
                    GitHub Repository Unavailable
                  </span>
                )}
              </div>
              {/* URL Live */}
              <div className="flex items-center gap-2">
                <GlobeAltIcon
                  className="hidden sm:block w-5 h-5 text-gray-600"
                  aria-hidden="true"
                />
                {projectData.liveUrl ? (
                  <a
                    href={projectData.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-800 hover:underline transition-colors text-xs sm:text-sm truncate"
                  >
                    Sito live
                  </a>
                ) : (
                  <span className="text-gray-500 text-xs sm:text-sm select-none truncate">
                    Live Site Unavailable
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Descrizione */}
        <div className="w-full p-2 mb-4 sm:p-4 flex flex-col">
          <div className="mb-4">
            <h2 className="text-md sm:text-lg font-semibold text-gray-800 mb-2 select-none truncate">
              Description
            </h2>
            <div className="max-h-80 overflow-y-auto">
              <p className="pe-4 text-xs sm:text-sm text-gray-700 leading-relaxed break-words select-none">
                {projectData.description}
              </p>
            </div>
          </div>
        </div>

        {/* Buttoni di navigazione */}
        <div className="absolute bottom-2 right-4 flex gap-4">
          {/* Button per tornare alla pagina progetti */}
          <button
            className="flex items-center gap-1 group"
            onClick={() => navigate("/projects")}
          >
            <ArrowLeftIcon className={`w-5 h-5 ${isDark ? "group-hover:text-black/60" : "group-hover:text-gray-400"}`} />
            <span 
              className={`
                font-lobster text-sm md:text-base lg:text-lg pb-1
                ${isDark ? "group-hover:text-black/60" : "group-hover:text-gray-400"}
              `}
            >
              Projects
            </span>
          </button>

          {/* Button per tornare alla Home page */}
          <button
            className={`
              flex items-center
              font-lobster text-sm md:text-base lg:text-lg pb-1
              ${isDark ? "hover:text-black/60" : "hover:text-gray-400"}
            `}
            onClick={() => navigate("/")}
          >
            Home
          </button>
        </div>
      </div>

      <CarouselMedia images={images} videos={videos} />
    </>
  );
}
