const express = require("express");
const { AddCourses, GetCourses,UpdateCourses, DeleteCourses } = require("../controller/coursesController");
const router = express.Router();

router.post("/add", AddCourses);
router.get("/get", GetCourses);
router.put("/update/:id", UpdateCourses);
router.delete("/delete/:id", DeleteCourses);

module.exports = router;