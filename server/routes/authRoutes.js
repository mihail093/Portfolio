const express = require('express');
const router = express.Router();
const {
    loginAdmin,
    getAdminProfile,
    logoutAdmin
} = require('../controllers/authController');
const { protectAdmin } = require('../middleware/authMiddleware');

// Route pubbliche
router.post('/admin/login', loginAdmin);

// Route protette
router.get('/admin/me', protectAdmin, getAdminProfile);
router.get('/admin/logout', protectAdmin, logoutAdmin);

module.exports = router;