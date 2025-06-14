// Importo i moduli necessari
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const { createInitialAdmin } = require('./controllers/authController');

// Carico le variabili d'ambiente dal file .env
dotenv.config();

// Connesione al Data Base
connectDB();

// Importo le rotte
const projectRoutes = require('./routes/projectRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const authRoutes = require('./routes/authRoutes');

// Creo l'applicazione Express
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true // Importante per i cookie tra domini diversi
}));

// Route di test per verificare che il server funzioni
app.get('/', (req, res) => {
    res.send('API del Portfolio attiva e funzionante!');
});

// Monta le route API
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/media', mediaRoutes);

// Gestione errori 404 (route non trovata)
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint non trovato'
    });
});

// Variabile per la porta del server
const PORT = process.env.PORT || 5000;

// Avvio il server dopo la connessione al database
app.listen(PORT, async () => {
    console.log(`Server in esecuzione sulla porta ${PORT}`);

    // Crea admin iniziale se non esiste
    await createInitialAdmin();
});