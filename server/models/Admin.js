const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Il nome è obbligatorio"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "L'email è obbligatoria"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Inserisci un'email valida"],
  },
  password: {
    type: String,
    required: [true, "La password è obbligatoria"],
    minlength: [6, "La password deve essere di almeno 6 caratteri"],
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware per criptare la password prima del salvataggio
AdminSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        return next(error);
    }
});

// Metodo per confrontare le password
AdminSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Admin', AdminSchema);