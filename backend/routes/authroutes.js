const express = require("express");
const { login, register } = require("../controllers/authController");
const {
  checkLoginData,
  checkRegisterData, 
} = require("../services/checkData");

const router = express.Router();

router.post("/login", checkLoginData, login);
router.post("/register", checkRegisterData, register);

module.exports = router;
