//Ce fichier definit les routes d'accès pour mon api (endpoints)

const express = require("express");
const router = express.Router();
const pool = require("../database/db_connection");

//Routes depuis une base de données créer directement sur sql. On recupère les infos de bdd depuis la const pool. Ensuite il effectue la requête spuhaité ici SELECT * FROM users
router.get("/", async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users");
    res.json(users);
  } catch (err) {
    res.status(500).json;
    ({ error: err.message });
  }
});

//route pour un users en particulier en fonction de son id
router.get("./id", async (req, res) => {
  try {
    const user = await pool.query("SELECT * FROM users WHERE id = ?", [
      req.params.id,
    ]);

    if (user.length === 0) {
      res.sendStatus(404).json({ message: "Not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//création d'un user

router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;
    const result = await pool.query(
      "INSERT INTO users (email) VALUES (?)",
      [name, email]
    );
    res
      .status(201)
      .json({ message: "User created", id: result.insertId.toString() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Mise à jour du user
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    await pool.query("UPDATE users SET name = ?, email = ? WHERE id = ?", [
      name,
      email,
      id,
    ]);
    res.json({ message: "User update" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Supression du user

router.delete("/:id", async (req, res) => {
  try {
    const {id} = req.params;
    await pool.query("DELETE FROM users WHERE id = ?", [id]);
    res.json({message : "User delete"});
  } catch (error) {
    res.status(500).json( {error : error.message})
  }
})

module.exports = router;
