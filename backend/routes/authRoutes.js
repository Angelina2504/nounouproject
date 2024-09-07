const express = require("express");
const authController = require("../controllers/authController");
const {
  checkLoginData,
  checkRegisterData,
} = require("../services/checkData");
const checkSession = require('../services/checkSession');

const router = express.Router();

router.post("/login", checkLoginData, authController.login);
router.post("/logout", authController.logout);
router.post("/register", checkRegisterData, authController.register);
router.get("/session", checkSession, authController.session); // Appelée pour vérifier si l'utilisateur est connecté
router.get("/is-admin", checkSession, authController.isAuthenticatedUserAdmin);

module.exports = router;
