const {initializeDatabase} = require("./database/initializeDatabase")

//Ce fichier permet de générer un sereveur express sur un port donné

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");


const routes = require("./routes/routes");
const authRoutes = require("./routes/authroutes");
const usersRoutes = require("./routes/usersRoutes");

//Variable qui permet de stocker l'instance express
const app = express();

app.use(cors({ origin: process.env.CLIENT_URL}));

app.use(express.json());
app.use(cookieParser());
app.use("/users", usersRoutes);
app.use("/auth", authRoutes);
app.use("/", routes);

//Création de la const pour le PORT
const PORT = process.env.APP_PORT;
//Écouter sur un port et faire une action. Il est possible de mettre sous format json étant donné que c'est du back et non du frontend
app.listen(PORT, async () => {
  console.log(`J'écoute sur le port ${PORT}`);
  await initializeDatabase();
});