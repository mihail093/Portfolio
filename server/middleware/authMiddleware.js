const { verifyToken } = require("../config/jwt");
const Admin = require("../models/Admin");

// Middleware per proteggere le route admin
exports.protectAdmin = async (req, res, next) => {
  try {
    let token;

    // Verifica se il token è presente nell'header Authorization
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Estrae il token dall'header
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies && req.cookies.token) {
      // Oppure dai cookie
      token = req.cookies.token;
    }

    // Verifica che il token esista
    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Accesso non autorizzato, effettua il login come admin",
      });
    }

    // Verifica che il token sia valido
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        error: "Token non valido o scaduto",
      });
    }

    // Verifica che l'utente sia effettivamente un admin
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(401).json({
        success: false,
        error: "L'admin con questo ID non esiste più",
      });
    }

    // Aggiunge l'admin alla request
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: "Non autorizzato, errore nel token",
    });
  }
};