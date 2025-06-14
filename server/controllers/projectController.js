const Project = require('../models/Project');

// Ottieni tutti i progetti GET /api/projects
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ order: 1 });

        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Errore del server'
        });
    }
};

// Ottieni un singolo progetto GET /api/projects/:id
exports.getProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if(!project)
            return res.status(404).json({
                success: false,
                error: 'Progetto non trovato'
        })

        res.status(200).json({
            success: true,
            data: project
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Errore del server'
        })
    }
};

// Crea un nuovo progetto POST /api/projects
exports.createProject = async (req, res) => {
    try {
        const project = await Project.create(req.body);

        res.status(201).json({
            success: true,
            data: project
        });
    } catch (error) {
        if(error.name === 'ValidationError') {
            // Errori di validazione Mongoose
            const messages = Object.values(error.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            res.status(500).jason({
                success: false,
                error: 'Errore del server'
            });
        }
    }
};

// Aggiorna un progetto PUT /api/projects/:id
exports.updateProject = async (req, res) => {
    try {
        // {new: true} fa sì che il metodo restituisca il documento aggiornato
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true // Applica le validazioni anche durante l'oggiornamento
        })

        if(!project) {
            return res.status(404).json({
                success: false,
                error: 'Progetto non trovato'
            });
        }

        res.status(200).json({
            success: true,
            data: project
        });
    } catch (error) {
        if(error.name === 'ValidationError') {
            const messages = Object.values(error.erros).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Errore del server'
            });
        }
    }
};

// Elimina un progetto DELETE /api/projects/:id
exports.deleteProject = async (req, res) => {
    try {
        const project = Project.findById(req.params.id)

        if(!project) {
            return res.status(404).json({
                success: false,
                error: 'Progetto non trovato'
            });
        }

        await project.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Errore del server'
        });
    }
};

// Ottieni progetti in evidenza GET /api/projects/featured
exports.getFeaturedProjects = async (req, res) => {
    try {
        const projects = await Project.find({ featured: true }).sort({ order: 1})

        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Errore del server'
        });
    }
};