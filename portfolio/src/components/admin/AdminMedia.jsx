import React, { useState, useEffect, useRef } from "react";
import { mediaService } from "../../services/apiService";
import AdminProjectMedia from "./AdminProjectMedia";
import AdminOtherMedia from "./AdminOtherMedia";
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

export default function AdminMedia() {
  const CARD_PROJECTS_BG_ID = "68506f3870324877aa850d03";
  const CARD_OTHER_BG_ID = "68506ee370324877aa850d00";

  // Flag per prevenire doppie chiamate
  const hasFetched = useRef(false);

  // useState per salvare url delle immagini di background
  const [cardsImgUrl, setCardsImgUrl] = useState({
    PROGETTI: null,
    ALTRO: null,
  });

  // useState per salvare le immagini per categoria
  const [otherMedia, setOtherMedia] = useState([]);
  const [projectMedia, setProjectMedia] = useState([]);

  // useState per gestire il click sulle cards
  const [cardProjectMedia, setCardProjectMedia] = useState(false);
  const [cardOtherMedia, setCardOtherMedia] = useState(false);

  useEffect(() => {
    // Prevenire doppie chiamate
    if (hasFetched.current) {
      return;
    }

    const fetchMediaData = async () => {
      try {
        hasFetched.current = true; // Marca come eseguito

        const mediaData = await mediaService.getMedia();

        if (mediaData && mediaData.data && Array.isArray(mediaData.data)) {
          // Trova le immagini background
          const projectCardImg = mediaData.data.filter(
            (item) => item._id === CARD_PROJECTS_BG_ID
          );
          const otherCardImg = mediaData.data.filter(
            (item) => item._id === CARD_OTHER_BG_ID
          );

          // Filtro le immagini per categoria
          const otherCategory = mediaData.data.filter(
            (item) => item.category === "other"
          );
          const projectCategory = mediaData.data.filter(
            (item) => item.category === "project"
          );

          // Aggiorna tutti gli stati
          const projectUrl = projectCardImg.length > 0 ? projectCardImg[0].mediaUrl : null;
          const otherUrl = otherCardImg.length > 0 ? otherCardImg[0].mediaUrl : null;

          setCardsImgUrl({
            PROGETTI: projectUrl,
            ALTRO: otherUrl,
          });
          setOtherMedia(otherCategory);
          setProjectMedia(projectCategory);
        }
      } catch (error) {
        console.error("Errore nel caricamento dei dati", error);
        hasFetched.current = false; // Reset del flag in caso di errore
      }
    };

    fetchMediaData();
  }, []);

  // Funzioni per gestire il click
  const handleClickCardProjectsMedia = () => {
    setCardOtherMedia(false);
    setCardProjectMedia(true);
  };

  const handleClickCardOtherMedia = () => {
    setCardProjectMedia(false);
    setCardOtherMedia(true);
  };

  const handleBackToCategories = () => {
    setCardProjectMedia(false);
    setCardOtherMedia(false);
  };

  // Funzione per gestire la rimozione del media
  const handleMediaRemoved = (removedId, category) => {
    if (category === "project") {
      setProjectMedia((prev) => prev.filter((item) => item._id !== removedId));
    } else if (category === "other") {
      setOtherMedia((prev) => prev.filter((item) => item._id !== removedId));
    }
  };

  return (
    <>
      {cardProjectMedia ? (
        <div className="px-1 sm:px-4 md:px-8">
          <button
            onClick={handleBackToCategories}
            className="
              flex items-center w-fit group mb-4 px-4 py-2 bg-[#7252bf] rounded-md
              hover:bg-[#564089] transition-colors cursor-pointer
              "
          >
            <ArrowLeftIcon className="h-4 w-4 sm:h-6 sm:w-6 text-black group-active:text-white" aria-hidden="true" />
            <span className="pl-1 pb-1 sm:pl-2 sm:pb-2 text-sm sm:text-lg text-white">categorie</span>
          </button>
          <AdminProjectMedia
            projectMedia={projectMedia}
            onMediaRemoved={handleMediaRemoved}
          />
        </div>
      ) : cardOtherMedia ? (
        <div className="px-1 sm:px-4 md:px-8">
          <button
            onClick={handleBackToCategories}
            className="
              flex items-center w-fit group mb-4 px-4 py-2 bg-[#7252bf] rounded-md
              hover:bg-[#564089] transition-colors cursor-pointer
              "
          >
            <ArrowLeftIcon className="h-4 w-4 sm:h-6 sm:w-6 text-black group-active:text-white" aria-hidden="true" />
            <span className="pl-1 pb-1 sm:pl-2 sm:pb-2 text-sm sm:text-lg text-white">categorie</span>
          </button>
          <AdminOtherMedia
            otherMedia={otherMedia}
            onMediaRemoved={handleMediaRemoved}
          />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row justify-center items-center h-full mt-8 md:mt-16 gap-y-8 md:gap-y-0 md:gap-x-12 px-2 sm:px-4 md:px-8">
          <div
            key="projects-card"
            className="
            group w-[200px] sm:w-[240px] h-[200px] sm:h-[240px] flex justify-center items-center
            border border-black shadow-md transition duration-190 
            hover:border-[#39ff14] hover:shadow-[0_0_20px_#39ff14] rounded-lg
            cursor-pointer
          "
            style={{
              backgroundImage: cardsImgUrl["PROGETTI"]
                ? `url(${cardsImgUrl["PROGETTI"]})`
                : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
            }}
            onClick={handleClickCardProjectsMedia}
          >
            <h1
              className="
              p-1 text-md text-white bold font-montserrat bg-black bg-opacity-75 select-none
              transition duration-200 rounded
              group-hover:bg-[#39ff14] group-hover:text-black group-hover:bg-opacity-100
            "
              style={{
                transform: "translateZ(0)",
              }}
              aria-label="projects images section"
            >
              PROGETTI ({projectMedia.length})
            </h1>
          </div>
          <div
            key="other-card"
            className="
            group w-[200px] sm:w-[240px] h-[200px] sm:h-[240px] flex justify-center items-center
            border border-black shadow-md transition duration-190 
            hover:border-[#39ff14] hover:shadow-[0_0_20px_#39ff14] rounded-lg
            cursor-pointer
          "
            style={{
              backgroundImage: cardsImgUrl["ALTRO"]
                ? `url(${cardsImgUrl["ALTRO"]})`
                : "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
            }}
            onClick={handleClickCardOtherMedia}
          >
            <h1
              className="
              p-1 text-md text-white bold font-montserrat bg-black bg-opacity-75 select-none
              transition duration-200 rounded
              group-hover:bg-[#39ff14] group-hover:text-black group-hover:bg-opacity-100
            "
              style={{
                transform: "translateZ(0)",
              }}
              aria-label="other images section"
            >
              ALTRO ({otherMedia.length})
            </h1>
          </div>
        </div>
      )}
    </>
  );
}