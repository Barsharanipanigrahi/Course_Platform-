const Category = require("../model/Category");
const Course = require("../model/Courses");

/* ── GET all categories (active only — public) ──────────── */
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ name: 1 });
    res.json({ status: true, categories });
  } catch (err) {
    res.status(500).json({ status: false, message: "Server error", error: err.message });
  }
};

/* ── GET all categories (admin — includes inactive) ─────── */
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json({ status: true, categories });
  } catch (err) {
    res.status(500).json({ status: false, message: "Server error", error: err.message });
  }
};

/* ── GET single category by ID ──────────────────────────── */
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ status: false, message: "Category not found" });
    res.json({ status: true, category });
  } catch (err) {
    res.status(500).json({ status: false, message: "Server error", error: err.message });
  }
};

/* ── GET courses belonging to a category ────────────────── */
const getCoursesByCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ status: false, message: "Category not found" });

    // ✅ Query by ObjectId, not by name
    const courses = await Course.find({ category: category._id }).populate("category");
    res.json({ status: true, category, courses });
  } catch (err) {
    res.status(500).json({ status: false, message: "Server error", error: err.message });
  }
};

/* ── ADD category ───────────────────────────────────────── */
const addCategory = async (req, res) => {
  try {
    const { name, description, color } = req.body;

    if (!name || !name.trim())
      return res.status(400).json({ status: false, message: "Category name is required" });

    const existing = await Category.findOne({ name: name.trim() });
    if (existing)
      return res.status(409).json({ status: false, message: "Category already exists" });

    const category = await Category.create({
      name: name.trim(),
      description: description?.trim(),
      color,
    });

    res.status(201).json({ status: true, message: "Category created successfully", category });
  } catch (err) {
    res.status(500).json({ status: false, message: "Server error", error: err.message });
  }
};

/* ── UPDATE category ────────────────────────────────────── */
const updateCategory = async (req, res) => {
  try {
    const { name, description, color, isActive } = req.body;

    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ status: false, message: "Category not found" });

    if (name && name.trim() !== category.name) {
      const duplicate = await Category.findOne({ name: name.trim() });
      if (duplicate)
        return res.status(409).json({ status: false, message: "Another category with this name already exists" });
    }

    if (name !== undefined) category.name = name.trim();
    if (description !== undefined) category.description = description.trim();
    if (color !== undefined) category.color = color;
    if (isActive !== undefined) category.isActive = isActive;

    await category.save();
    res.json({ status: true, message: "Category updated successfully", category });
  } catch (err) {
    res.status(500).json({ status: false, message: "Server error", error: err.message });
  }
};

/* ── DELETE category ────────────────────────────────────── */
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ status: false, message: "Category not found" });

    // ✅ Query by ObjectId, not by name
    const courseCount = await Course.countDocuments({ category: category._id });
    if (courseCount > 0)
      return res.status(400).json({
        status: false,
        message: `Cannot delete — ${courseCount} course(s) are using this category. Reassign them first.`,
      });

    await Category.findByIdAndDelete(req.params.id);
    res.json({ status: true, message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ status: false, message: "Server error", error: err.message });
  }
};

/* ── TOGGLE active status ───────────────────────────────── */
const toggleCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ status: false, message: "Category not found" });

    category.isActive = !category.isActive;
    await category.save();

    res.json({
      status: true,
      message: `Category ${category.isActive ? "activated" : "deactivated"} successfully`,
      category,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: "Server error", error: err.message });
  }
};

module.exports = {
  getCategories,
  getAllCategories,
  getCategoryById,
  getCoursesByCategory,
  addCategory,
  updateCategory,
  deleteCategory,
  toggleCategory,
};