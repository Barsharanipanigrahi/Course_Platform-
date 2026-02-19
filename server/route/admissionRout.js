const express = require("express");
const router = express.Router();

const {
  createAdmission,
  getAllAdmissions,
  updateAdmissionStatus,
} = require("../controllers/admissionController");

const { authMiddleware, adminOnly } = require("../middleware/auth");

/* =========================
   Admission Routes
   ========================= */

// Student submits admission
router.post("/", authMiddleware, createAdmission);

// Admin views all admissions
router.get("/", authMiddleware, adminOnly, getAllAdmissions);

// Admin updates status
router.put("/:id", authMiddleware, adminOnly, updateAdmissionStatus);

module.exports = router;
