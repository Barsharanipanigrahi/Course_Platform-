const express = require("express");
const { AddContact } = require("../controller/contactController");
const router = express.Router();

router.post("/add", AddContact);

module.exports = router;