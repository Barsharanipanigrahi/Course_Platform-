const express = require("express");
const { AddContact, GetContact, UpdateContact, DeleteContact, ReplyContact } = require("../controller/Contactcontroller");
const router = express.Router();

router.post("/add", AddContact);
router.get("/get", GetContact);
router.put("/update/:id", UpdateContact);
router.delete("/delete/:id", DeleteContact);
router.post("/reply", ReplyContact); // ← new

module.exports = router;