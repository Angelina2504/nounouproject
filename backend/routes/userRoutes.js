const express = require("express");
const userController = require("../controllers/userController");
const checkSession = require('../services/checkSession');

const router = express.Router();

router.get("/profile", checkSession, userController.myProfile);
router.put("/profile/edit", checkSession, userController.edit);
router.post("/checkDelete", checkSession, userController.checkDelete);
//router.delete("/delete/:id", checkSession, userController.destroy);

module.exports = router;
