const argon2 = require("argon2");
// const { findOneByEmail, createUser } = require("../models/userRepository");
const userRepository = require("../models/userRepository");

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userRepository.findOneByEmail(email);

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

         const passwordMatch = await argon2.verify(user.password, password);

        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Sauvegarde de la session, on stocke l'id et l'email de l'utilisateur car on en aura besoin dans d'autres requêtes
        req.session.user = {
            id: user.id,
            email: user.email
        };

        // On doit retourner l'id et l'email de l'utilisateur pour le front dans la réponse
        res.status(200).json({ success: true,
                               user: { id: user.id, email: user.email}
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const logout = async (req, res) => {
    // Supperession de la session côté serveur
    req.session.destroy(err => {
        if (err) {
            console.error("Error during logout:", err);
            return res.status(500).json({ success: false, message: "Logout failed" });
        }
        res.clearCookie("connect.sid"); // Nettoyer le cookie de session
        res.status(200).json({ success: true, message: "Logged out" });
    });
};


 const register = async (req, res) => {
    const { email, firstname, lastname, phoneNumber, address, password } = req.body;

    try {
        const hashedPassword = await argon2.hash(password);

        const userId = await userRepository.createUser({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            phoneNumber,
            address
        });

        res.status(201).json({ success: true, userId: String(userId) }); 
    } catch (error) {
        console.error("Error registering user :", error);
        res.status(500).json({ success: false, message: `Internal server error: ${error.message}` });
    }
};

 // Renvoie juste les informations de l'utilisateur connecté
 const session = async (req, res) => {
     res.json({ user: req.session.user });
 };

module.exports = {
    login,
    logout,
    register,
    session
};
