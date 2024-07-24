
const router = require("express").Router();

//Création d'une route par rapport au / qui renvoie toto
router.get("/", (req, res) => {
    res.send("toto");
  });

  module.exports = router;