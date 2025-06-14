import React from "react";

const ResponsiveCloudinaryImage = ({ imageUrl, alt, className = '', ...props }) => {
    // Non rendirizza se manca URL
    if(!imageUrl) return null;

    // Funzione per generare URL Cloudinary con larghezza immagine specifica
    const getOptimizeUrl = (url, width) => {
        // Se non è Cloudinary URL non esegue modifiche
        if(!url.includes('cloudinary.com')) return url;

        // Sostituisci il percorso di upload con parametri di trasformazione
        return url.replace('/upload/', `/upload/w_${width},c_limit,q_auto,f_auto/`);
    };

    // Genera srcSet con diverse dimensioni
    const srcSet = `
        ${getOptimizeUrl(imageUrl, 200)} 200w,
        ${getOptimizeUrl(imageUrl, 400)} 400w,
        ${getOptimizeUrl(imageUrl, 800)} 800w,
        ${getOptimizeUrl(imageUrl, 1200)} 1200w
    `;

    // Genera sizes in base alla larghezza dello schermo
    const sizes = "(max-width: 480px) 200px, (max-width: 768px) 400px, (max-width: 1200px) 800px";

    return (
        <img
            src={getOptimizeUrl(imageUrl, 400)} // Immagine predefinita a 400px
            srcSet={srcSet}
            sizes={sizes}
            alt={alt || "Immagine"}
            loading="lazy"
            className={`${className}`}
            {...props}
        />
    );
};

export default ResponsiveCloudinaryImage;