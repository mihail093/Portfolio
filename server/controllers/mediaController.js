const Media = require('../models/Media');
const { cloudinary } = require('../config/cloudinary');

// @desc    Ottieni tutti i media
// @route   GET /api/media
exports.getMedia = async (req, res) => {
  try {
    // Filtra per tipo e categoria se specificati nella query
    const filter = {};
    if (req.query.mediaType) {
      filter.mediaType = req.query.mediaType;
    }
    if (req.query.category) {
      filter.category = req.query.category;
    }
    
    const media = await Media.find(filter).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: media.length,
      data: media
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Errore del server'
    });
  }
};

// @desc    Ottieni un singolo media
// @route   GET /api/media/:id
exports.getMediaById = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    
    if (!media) {
      return res.status(404).json({
        success: false,
        error: 'Media non trovato'
      });
    }
    
    res.status(200).json({
      success: true,
      data: media
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Errore del server'
    });
  }
};

// @desc    Carica un nuovo media
// @route   POST /api/media
exports.uploadMedia = async (req, res) => {
  try {
    // req.file contiene le informazioni del file caricato da Multer
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'Nessun file caricato'
      });
    }

    // Determina il tipo di media in base al mimetype
    const mediaType = req.file.mimetype.startsWith('image/') ? 'image' : 'video';

    // Crea un nuovo record nel database
    const newMedia = new Media({
      title: req.body.title || 'Media senza titolo',
      mediaUrl: req.file.path, // URL del media su Cloudinary
      cloudinaryId: req.file.filename, // ID pubblico del media su Cloudinary
      mediaType: mediaType,
      category: req.body.category || 'project'
    });

    // Salva il record nel database
    const savedMedia = await newMedia.save();

    res.status(201).json({
      success: true,
      data: savedMedia
    });
  } catch (error) {
    console.error('Errore upload:', error.message || error);
    
    res.status(500).json({
      success: false,
      error: 'Errore durante il caricamento del media'
    });
  }
};

// @desc    Elimina un media
// @route   DELETE /api/media/:id
exports.deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    
    if (!media) {
      return res.status(404).json({
        success: false,
        error: 'Media non trovato'
      });
    }
    
    // Elimina il media da cloudinary
    await cloudinary.uploader.destroy(media.cloudinaryId, {
      resource_type: media.mediaType // Usa il tipo di media salvato nel database
    });
    
    // Elimina il record dal database
    await media.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Errore eliminazione:', error);
    res.status(500).json({
      success: false,
      error: 'Errore del server'
    });
  }
};