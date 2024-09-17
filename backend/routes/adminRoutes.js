const express = require('express');
const adminController = require('../controllers/adminController');
const userController = require('../controllers/userController');
const childController = require('../controllers/childController');
const tutorController = require('../controllers/tutorController');
const emergencyContactController = require('../controllers/emergencyContactController');
const checkSession = require('../services/checkSession');

const router = express.Router();

// TODO add checkAdmin middleware to check if the user is an admin
router.get('/families', checkSession, adminController.getFamilies);
router.get('/families/:id', checkSession, adminController.getFamilyDetails);

router.put('/users/:id', checkSession, userController.editFromAdmin);
router.delete('/users/:id', checkSession, userController.destroy);

router.put('/children/:id', checkSession, childController.editFromAdmin);
router.delete('/children/:id', checkSession, childController.destroy);

router.put('/tutors/:id', checkSession, tutorController.editFromAdmin);
router.delete('/tutors/:id', checkSession, tutorController.destroy);

router.get('/emergency-contacts', checkSession, emergencyContactController.browseForUserFromAdmin);

module.exports = router;
