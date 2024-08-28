const {initializeDatabase} = require("./database/initializeDatabase");

//Ce fichier permet de générer un serveur express sur un port donné

const express = require("express");
const session = require("express-session");
const cors = require("cors");

const routes = require("./routes/routes");
const authRoutes = require("./routes/authRoutes");
const childRoutes = require("./routes/childRoutes");
const userRoutes = require("./routes/userRoutes");
const tutorRoutes = require("./routes/tutorRoutes");

//Variable qui permet de stocker l'instance express
const app = express();

app.use(
    cors({
      origin: [
        process.env.CLIENT_URL, // keep this one, after checking the value in `backend/.env`
      ],
      credentials: true // permet de passer les cookies
    })
);

app.use(express.json());

// Configuration de la session
app.use(session(
    {
        secret: process.env.SESSION_SECRET_KEY, // Clé secrète pour signer le cookie de session
        resave: false, // Évite de sauvegarder la session si elle n'a pas été modifiée
        saveUninitialized: false, // Sauvegarde une session même si elle n'a pas encore été initialisée
        cookie: {
            httpOnly: true, // Empêche l'accès via JavaScript côté client
            secure: false, // Doit être true en prooduction avec HTTPS
            maxAge: 3600000 // Durée de vie de la session en ms soit 1 heure
        }
    })
);

// Configuration des routes de l'api
app.use("/", routes);
app.use("/auth", authRoutes);
app.use("/children", childRoutes);
app.use("/users", userRoutes);
app.use("/tutors", tutorRoutes);

//Création de la const pour le PORT
const PORT = process.env.APP_PORT;
//Écouter sur un port et faire une action. Il est possible de mettre sous format json étant donné que c'est du back et non du frontend
app.listen(PORT, async () => {
  console.log(`J'écoute sur le port ${PORT}`);
 // TODO Mis en commentaire : évite de réinitialiser la DB à chaque reload
 //  await initializeDatabase();
});
