const express    = require("express");
const router     = express.Router();
const {
  getCategories,
  getAllCategories,
  getCategoryById,
  getCoursesByCategory,
  addCategory,
  updateCategory,
  deleteCategory,
  toggleCategory,
} = require("../controller/categoryController");

// Middleware — add your actual auth/admin middleware imports here
// e.g. const { verifyToken, isAdmin } = require("../middleware/auth");

/* ── Public routes ──────────────────────────────────────── */
router.get("/get",              getCategories);         // GET  /category/get
router.get("/get/:id",          getCategoryById);       // GET  /category/get/:id
router.get("/:id/courses",      getCoursesByCategory);  // GET  /category/:id/courses

/* ── Admin routes (protect with your auth middleware) ───── */
// Example with middleware:
// router.get("/admin/all",       verifyToken, isAdmin, getAllCategories);
// router.post("/add",            verifyToken, isAdmin, addCategory);
// router.put("/update/:id",      verifyToken, isAdmin, updateCategory);
// router.delete("/delete/:id",   verifyToken, isAdmin, deleteCategory);
// router.patch("/toggle/:id",    verifyToken, isAdmin, toggleCategory);

// Without middleware (uncomment below if you handle auth elsewhere):
router.get("/admin/all",        getAllCategories);      // GET  /category/admin/all
router.post("/add",             addCategory);           // POST /category/add
router.put("/update/:id",       updateCategory);        // PUT  /category/update/:id
router.delete("/delete/:id",    deleteCategory);        // DEL  /category/delete/:id
router.patch("/toggle/:id",     toggleCategory);        // PAT  /category/toggle/:id

module.exports = router;