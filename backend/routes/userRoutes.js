const express = require("express");
const userController = require("../controllers/userController");
const checkSession = require('../services/checkSession');

const router = express.Router();

router.get("/profile", checkSession, userController.myProfile);
router.put("/profile/edit", checkSession, userController.edit);
router.post("/check-delete", checkSession, userController.checkDelete);

module.exports = router;
