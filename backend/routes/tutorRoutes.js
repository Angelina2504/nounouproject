const express = require("express");
const tutorController = require("../controllers/tutorController");
const checkSession = require('../services/checkSession');

const router = express.Router();

router.get("/", checkSession, tutorController.browse);
router.get("/:id", checkSession, tutorController.read);
router.put("/edit/:id", checkSession, tutorController.edit);
router.post("/create", checkSession, tutorController.add);
router.delete("/delete/:id", checkSession, tutorController.destroy);

module.exports = router;
