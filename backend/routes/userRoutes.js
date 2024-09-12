const express = require("express");
const userController = require("../controllers/userController");
const checkSession = require('../services/checkSession');

const router = express.Router();

router.get("/profile", checkSession, userController.myProfile);
router.put("/edit/:id", checkSession, userController.edit);
//router.post("/create", checkSession, userController.add);
//router.delete("/delete/:id", checkSession, userController.destroy);

module.exports = router;
