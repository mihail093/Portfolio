const mongoose = require('mongoose');

// Definizione dello schema
const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Il titolo del progetto è obligatorio'],
        trim: true,
        maxLength: [100, 'Il titolo del progetto non può superare i 100 caratteri']
    },
    description: {
        type: String,
        required: [true, 'la descrizione del progetto è obligatoria'],
        maxLength: [1000, 'la descrizione del progetto non può superare i 1000 caratteri']
    },
    technologies: {
        type: [String],
        required: [true, 'Specificare almeno una tecnologia utilizzata']
    },
    imageUrl: {
        type: String,
        required: [true, "L'immagine del progetto è obbligatoria"],
    },
    githubUrl: {
        type: String,
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Inserisci un URL valido'
        ]
    },
    liveUrl: {
        type: String,
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Inserisci un URL valido'
        ]
    },
    featured: {
        type: Boolean,
        default: false
    },
    order: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

/*
Il campo featured serve ad identificare i progetti da mettere in evidenza,
il campo order serve a controllare l'ordine di visualizzazione dei progetti
*/

module.exports = mongoose.model('Project', ProjectSchema);