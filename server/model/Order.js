const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  paymentType: {
    type: String,
    enum: ["full", "installment"],
    required: true,
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  discountApplied: {
    type: Number,
    default: 0, // percentage e.g. 10
  },
  amountPaid: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  remainingAmount: {
    type: Number,
    default: 0,
  },
  installments: [
    {
      installmentNumber: Number,
      amount: Number,
      dueDate: Date,
      paid: { type: Boolean, default: false },
      paidAt: Date,
    },
  ],
  status: {
    type: String,
    enum: ["pending", "partial", "completed"],
    default: "pending",
  },
  transactionId: {
    type: String,
    default: () => "TXN" + Date.now() + Math.floor(Math.random() * 10000),
  },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);