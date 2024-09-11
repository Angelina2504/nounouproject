const express = require("express");
const childController = require("../controllers/childController");
const checkSession = require('../services/checkSession');

const router = express.Router();

router.get("/", checkSession, childController.browseForUser);
router.get("/:id", checkSession, childController.read);
router.put("/edit/:id", checkSession, childController.edit);
router.post("/create", checkSession, childController.add);
router.delete("/delete/:id", checkSession, childController.destroy);

module.exports = router;
