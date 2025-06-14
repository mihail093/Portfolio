const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Il titolo del media è obbligatorio"],
    trim: true,
    maxlength: [100, 'Il titolo del media non può superare i 100 caratteri']
  },
  mediaUrl: {
    type: String,
    required: [true, "L'URL del media è obbligatorio"]
  },
  cloudinaryId: {
    type: String,
    required: [true, "L'ID Cloudinary è obbligatorio"]
  },
  mediaType: {
    type: String,
    enum: ['image', 'video'],
    required: [true, "Il tipo di media è obbligatorio"]
  },
  category: {
    type: String,
    enum: ['project', 'other'],
    default: 'project'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Media', MediaSchema);