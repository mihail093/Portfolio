import React, { useState, useEffect } from 'react';
import { mediaService } from '../../services/apiService';
import { FaCode, FaRocket } from 'react-icons/fa';
import { IoSchool } from 'react-icons/io5';
import { MdOutlineWebAsset, MdOutlinePsychology } from 'react-icons/md';

export default function AboutCard({ type, title, content }) {
    const imgProfileID = "685070a770324877aa850d08";

    // useState per salvare i dati dell'immagine
    const [imgProfile, setImgProfile] = useState(null);

    // useState per gestire il caricamento
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMediaData = async () => {
            try {
                setLoading(true);
                const mediaData = await mediaService.getMediaById(imgProfileID);
                if (mediaData) {
                    setImgProfile(mediaData.data.mediaUrl);
                }
            } catch (error) {
                console.error("Errore nel caricamento dell'immagine profilo", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMediaData();
    }, [imgProfileID])

    // Definizione dei tipi di Card con le relative icone e stili
    const CARD_TYPES = {
        profile: {
            icon: imgProfile,
            className: 'h-40 w-40 m-auto',
            bgColor: 'bg-[#a0c4ff] dark:bg-[#182136]'
        },
        education: {
            icon: IoSchool,
            className: 'h-6 w-6 m-2 text-yellow-400 dark:text-yellow-300',
            bgColor: 'bg-[#9bf6ff] dark:bg-[#122b30]'
        },
        project: {
            icon: MdOutlineWebAsset,
            className: 'h-6 w-6 m-2 text-green-600 dark:text-green-400',
            bgColor: 'bg-[#caffbf] dark:bg-[#182617]'
        },
        technicalSkills: {
            icon: FaCode,
            className: 'h-7 w-7 m-2 text-orange-500 dark:text-orange-300',
            bgColor: 'bg-[#fdffb6] dark:bg-[#2D2936]'
        },
        softSkills: {
            icon: MdOutlinePsychology,
            className: 'h-8 w-8 m-2 text-pink-500 dark:text-pink-200',
            bgColor: 'bg-[#ffd6a5] dark:bg-[#2D2020]'
        },
        goals: {
            icon: FaRocket,
            className: 'h-6 w-6 m-2 text-red-600 dark:text-red-200',
            bgColor: 'bg-[#ffadad] dark:bg-[#321217]'
        }
    }

    // Selezione dell'icona e delle classi in base al tipo di Card
    const CardIcon = CARD_TYPES[type]?.icon;
    const cardClass = CARD_TYPES[type]?.className;
    const bgClass = CARD_TYPES[type]?.bgColor;

  return (
    <div className={`${bgClass} w-[65%] md:w-[55%] max-w-[420px] mx-auto space-y-2 py-6 my-2`}>
        <div className='font-lobster select-none'>
            {type === 'profile' ? (
                <div>
                    <h1 className='text-center text-5xl mb-4'>{title}</h1>
                    {loading
                        ? <div className={`${cardClass} animate-pulse bg-gray-200`} />
                        : <img src={CardIcon} alt="Profile" className={`${cardClass}`} />
                    }
                </div>
            ) : (
                <div>
                    <CardIcon className={`${cardClass}`} aria-hidden="true" />
                    <h1 className='text-center text-5xl'>{title}</h1>
                </div>
            )}
        </div>
        <div className='p-6 font-montserrat select-none'>
            {content}
        </div>
    </div>
  )
}
