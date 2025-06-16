const express = require("express");
const router = express.Router();
const {
  getMedia,
  getMediaById,
  uploadMedia,
  deleteMedia,
  getAllTags,
} = require("../controllers/mediaController");
const { upload } = require("../config/cloudinary");
const { protectAdmin } = require("../middleware/authMiddleware");

// Route pubbliche
router.get("/", getMedia);
router.get("/tags", getAllTags);
router.get("/:id", getMediaById);

// Route protette
router.post("/", protectAdmin, upload.single("media"), uploadMedia);
router.delete("/:id", protectAdmin, deleteMedia);

module.exports = router;