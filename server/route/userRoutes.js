const express = require("express");
const { getAllUsers, deleteUser } = require("../controller/userController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// ADMIN ONLY
router.get("/get", protect, adminOnly, getAllUsers);
router.delete("/delete/:id", deleteUser);

module.exports = router;
