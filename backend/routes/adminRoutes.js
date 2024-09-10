const express = require('express');
const adminController = require('../controllers/adminController');
const userController = require('../controllers/userController');
const childController = require('../controllers/childController');
const tutorController = require('../controllers/tutorController');
const checkSession = require('../services/checkSession');

const router = express.Router();

// TODO add checkAdmin middleware to check if the user is an admin
router.get('/families', checkSession, adminController.getFamilies);
router.get('/families/:id', checkSession, adminController.getFamilyDetails);
router.put('/users/:id', checkSession, userController.edit);
router.put('/children/:id', checkSession, childController.edit);
router.put('/tutors/:id', checkSession, tutorController.edit);

module.exports = router;
