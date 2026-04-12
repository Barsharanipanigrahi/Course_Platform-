const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { createOrder, getMyOrders, getAllOrders } = require("../controller/orderController");

router.post("/create", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/all", protect, adminOnly, getAllOrders);

module.exports = router;