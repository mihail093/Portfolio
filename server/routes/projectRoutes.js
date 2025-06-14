const express = require("express");
const router = express.Router();
const {
  getProjects,
  getFeaturedProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const { protectAdmin } = require("../middleware/authMiddleware");

// Route pubbliche
router.get("/", getProjects);
router.get("/featured", getFeaturedProjects);
router.get("/:id", getProject);

// Route protette (solo admin)
router.post("/", protectAdmin, createProject);
router.put("/:id", protectAdmin, updateProject);
router.delete("/:id", protectAdmin, deleteProject);

module.exports = router;
