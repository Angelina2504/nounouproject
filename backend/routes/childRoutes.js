const express = require("express");
const childController = require("../controllers/childController");

const router = express.Router();

router.get("/", childController.browse);
router.get("/:id", childController.read);
router.put("/edit/:id", childController.edit);
router.post("/create", childController.add);
router.delete("/delete/:id", childController.destroy);

module.exports = router;
