const express = require("express");
const adminController = require("../controllers/adminController");
const checkSession = require("../services/checkSession");

const router = express.Router();

router.get('/families', checkSession, adminController.getFamilies);
router.get('/families/:id', checkSession, adminController.getFamilyDetails);

module.exports = router;
