const argon2 = require("argon2");
const userRepository = require("../models/userRepository");

/**
 * Permet de se connecter à l'application
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
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

        console.log('=====> Current session:', req.session); // FIXME just to test deployment

        // On doit retourner l'id et l'email de l'utilisateur pour le front dans la réponse
        res.status(200).json({ success: true,
            user: { id: user.id, email: user.email}
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

/**
 * Permet de se déconnecter de l'application
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
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

/**
 * Permet de s'inscrire à l'application
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const register = async (req, res) => {
    const { email, firstname, lastname, phoneNumber, address, gender, password } = req.body;

    try {
        const hashedPassword = await argon2.hash(password);

        const userId = await userRepository.createUser({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            phoneNumber,
            address,
            gender
        });

        res.status(201).json({ success: true, userId: String(userId) });
    } catch (error) {
        console.error("Error registering user :", error);
        res.status(500).json({ success: false, message: `Internal server error: ${error.message}` });
    }
};

// Renvoie juste les informations de l'utilisateur connecté
// TODO : A compléter si on peut pas récupérer directement l'information de rôle
//  d'admin avec le user.id ? + middleware pour vérifier si l'utilisateur est admin
/**
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const session = async (req, res) => {
    res.json({ user: req.session.user });
};

const isAuthenticatedUserAdmin = async (req, res) => {
    try {
        // Get user id from session
        const userId = req.session.user.id;

        // Read user from database
        const user = await userRepository.read(userId);

        // If the user is found and is an admin, return true, else false
        // In database, is_admin is an int, so we need to check if it's 1 not True or False
        const isAdmin = user && user.is_admin === 1;

        return res.status(200).json({ success: true, isAdmin: isAdmin });
    } catch (error) {
        console.error("Error checking if user is admin", error);
        res.status(500).json({ success: false, message: `Internal server error: ${error.message}` });
    }
};

module.exports = {
    login,
    logout,
    register,
    session,
    isAuthenticatedUserAdmin
};
