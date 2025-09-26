const Admin = require('../models/Admin');
const { generateToken } = require('../config/jwt');

// Funzione per creare l'admin iniziale (da eseguire una sola volta)
exports.createInitialAdmin = async () => {
    try {
        const adminExists = await Admin.countDocuments();

        if(adminExists === 0) {
            const adminEmail = import.meta.env.ADMIN_EMAIL;
            const adminPassword = import.meta.env.ADMIN_PASSWORD;
            const adminName = import.meta.env.ADMIN_NAME;

            if (!adminEmail || !adminPassword || !adminName) {
                console.log("Controlla le variabili d'ambiente");
                return
            }

            // Crea l'admin
            await Admin.create({
                name: adminName,
                email: adminEmail,
                password: adminPassword
            });

            console.log("Admin iniziale creato con successo");
        }
    } catch (error) {
        console.error("Errore nella creazione dell'admin iniziale", error);
    }
};

// Login admin POST /api/auth/admin/login
exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verifica che email e password siano state fornite
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: "Inserisci email e password"
            });
        }

        // Trova l'admin e include la password per il confronto
        const admin = await Admin.findOne({ email }).select("+password");

        // Verifica se l'admin esiste
        if(!admin) {
            return res.status(401).json({
                success: false,
                error: "Credenziali non valide"
            });
        }

        // Verifica la password
        const isMatch = await admin.comparePassword(password);

        if(!isMatch) {
            return res.status(401).json({
                success: false,
                error: "Credenziali non valide"
            });
        }

        // Genera un token
        const token = generateToken(admin);

        // Salva il token in un cookie HTTP-only
        res.cookie('token', token, {
            httpOnly: true,
            secure: import.meta.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 1 giorno
        });

        res.status(200).json({
            success: true,
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Ottieni profilo admin corrente GET /api/auth/admin/me
exports.getAdminProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.user.id);

        if (!admin) {
            return res.status(404).json({
                success: false,
                error: "Admin non trovato"
            });
        }

        res.status(200).json({
            success: true,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Logout admin GET /api/auth/admin/logout
exports.logoutAdmin = (req, res) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        data: {}
    });
};