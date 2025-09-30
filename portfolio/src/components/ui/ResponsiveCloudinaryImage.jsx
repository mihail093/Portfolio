import React from "react";

const ResponsiveCloudinaryImage = ({ imageUrl, alt, className = '', ...props }) => {
    if(!imageUrl) return null;

    const getOptimizeUrl = (url, width) => {
        if(!url.includes('cloudinary.com')) return url;
        return url.replace('/upload/', `/upload/w_${width},c_limit,q_auto,f_auto/`);
    };

    const srcSet = `
        ${getOptimizeUrl(imageUrl, 200)} 200w,
        ${getOptimizeUrl(imageUrl, 300)} 300w,
        ${getOptimizeUrl(imageUrl, 400)} 400w,
        ${getOptimizeUrl(imageUrl, 600)} 600w,
        ${getOptimizeUrl(imageUrl, 800)} 800w,
        ${getOptimizeUrl(imageUrl, 1200)} 1200w
    `;

    const sizes = `
        (max-height: 600px) 540px,
        (max-width: 480px) 300px,
        (max-width: 768px) 400px,
        (max-width: 1200px) 800px,
        1200px
    `;

    return (
        <img
            src={getOptimizeUrl(imageUrl, 400)}
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