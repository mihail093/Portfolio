require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

console.log('JWT_SECRET:', !!process.env.JWT_SECRET);
console.log('JWT_EXPIRES_IN:', process.env.JWT_EXPIRES_IN);

// Funzione per generare un token JWT
const generateToken = (admin) => {
    return jwt.sign(
        {
            id: admin._id,
            email: admin.email,
            role: 'admin'
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN}
    );
};

// Funzione per verificare un token JWT
const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};

module.exports = {
    generateToken,
    verifyToken,
    JWT_SECRET
};