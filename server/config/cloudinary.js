const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Configurazione Cloudinary
cloudinary.config({
  cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.CLOUDINARY_API_KEY,
  api_secret: import.meta.env.CLOUDINARY_API_SECRET,
});

// Controllo ping per verificare la connessione a Cloudinary
cloudinary.api.ping((error, result) => {
  if (error) {
    console.error("Errore connessione Cloudinary:", error);
  } else {
    console.log("Connessione Cloudinary OK:", result);
  }
});

// Limiti di dimensione file in base al tipo
const IMAGE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB per le immagini
const VIDEO_SIZE_LIMIT = 100 * 1024 * 1024; // 100MB per i video

// Configurazione storage per Multer con ottimizzazioni
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "portfolio",
    // Determina il tipo di risorsa (video o immagine)
    resource_type: (req, file) => {
      return file.mimetype.startsWith("video/") ? "video" : "auto";
    },
    // Formati consentiti per ogni tipo di media
    allowed_formats: (req, file) => {
      if (file.mimetype.startsWith("video/")) {
        return ["mp4", "mov", "avi", "webm"];
      } else {
        return ["jpg", "jpeg", "png", "gif", "svg"];
      }
    },
    // Trasformazioni condizionali in base al formato
    transformation: (req, file) => {
      if (file.mimetype.startsWith("video/")) {
        return [
          { width: 1280, height: 720, crop: "limit" }, // Dimensione massima video
          { quality: "auto" }, // Ottimizzazione automatica qualità
          { format: "mp4" }, // Converti tutto in mp4 per compatibilità
        ];
      } else {
        return [
          { width: 1200, height: 800, crop: "limit" }, // Dimensione massima immagine
          { quality: "auto" }, // Ottimizzazione automatica della qualità
          { fetch_format: "auto" }, // Seleziona automaticamente il miglior formato (WebP dove supportato)
        ];
      }
    },
    // Aggiungi tag per migliore organizzazione
    tags: (req, file) => {
      const baseTags = ["portfolio"];

      // Aggiunta di tag personalizzati da frontend
      const customTags = req.body.tags
        ? Array.isArray(req.body.tags)
          ? req.body.tags
          : req.body.tags.split(",").map((tag) => tag.trim())
        : [];

      if (file.mimetype.startsWith("video/")) {
        return [...baseTags, "video", ...customTags];
      } else {
        return [...baseTags, "image", ...customTags];
      }
    },
  },
});

// Funzione di utilità per controllare il tipo di file
const fileFilter = (req, file, cb) => {
  // Controlla che il file sia un'immagine o un video
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype.startsWith("video/")
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Formato file non supportato. Carica solo immagini o video."),
      false
    );
  }
};

// Middleware per verificare la dimensione del file prima dell'upload
const fileSizeChecker = (req, res, next) => {
  return (req, res, next) => {
    if (!req.file) return next();

    const isVideo = req.file.mimetype.startsWith("video/");
    const sizeLimit = isVideo ? VIDEO_SIZE_LIMIT : IMAGE_SIZE_LIMIT;

    if (req.file.size > sizeLimit) {
      const typeText = isVideo ? "video" : "immagine";
      const sizeMB = isVideo ? "100MB" : "5MB";
      return res.status(400).json({
        success: false,
        error: `Il ${typeText} caricato è troppo grande. La dimensione massima è ${sizeMB}.`,
      });
    }

    next();
  };
};

// Crea il middleware di upload con limiti di sicurezza
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: VIDEO_SIZE_LIMIT, // Imposta al limite maggiore, poi verifichiamo nel middleware
  },
});

// Funzione utilità per generare URL responsive
const getResponsiveImageUrl = (baseUrl, width) => {
  if (!baseUrl) return "";

  // Gestisci diversamente video e immagini
  if (baseUrl.includes("/video/")) {
    return baseUrl.replace(
      "/video/upload/",
      `/video/upload/w_${width},c_limit,q_auto/`
    );
  } else {
    return baseUrl.replace(
      "/upload/",
      `/upload/w_${width},c_limit,q_auto,f_auto/`
    );
  }
};

// Funzione utilità per generare URL per i poster dei video
const getVideoPosterUrl = (videoUrl) => {
  if (!videoUrl || !videoUrl.includes("/video/")) return "";
  return videoUrl.replace("/video/upload/", "/video/upload/q_auto,f_jpg,so_0/");
};

module.exports = {
  cloudinary,
  upload,
  getResponsiveImageUrl,
  getVideoPosterUrl,
  fileSizeChecker,
  IMAGE_SIZE_LIMIT,
  VIDEO_SIZE_LIMIT,
};