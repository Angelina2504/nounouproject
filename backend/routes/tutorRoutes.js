const express = require("express");
const tutorController = require("../controllers/tutorController");

const router = express.Router();

router.get("/", tutorController.browse);
router.get("/:id", tutorController.read);
router.put("/edit/:id", tutorController.edit);
router.post("/create", tutorController.add);
router.delete("/delete/:id", tutorController.destroy);

module.exports = router;
