const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  },
  duration: {
    type: String,
  },
  price: Number,
}, { timestamps: true });
  

module.exports = mongoose.model("Course", courseSchema);