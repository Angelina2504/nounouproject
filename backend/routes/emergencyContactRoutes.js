const express = require("express");
const emergencyContactController = require("../controllers/emergencyContactController");
const checkSession = require('../services/checkSession');

const router = express.Router();

router.get("/", checkSession, emergencyContactController.browseForUser);
router.put("/edit/:id", checkSession, emergencyContactController.edit);
router.post("/create", checkSession, emergencyContactController.add);
router.delete("/delete/:id", checkSession, emergencyContactController.destroy);

module.exports = router;
