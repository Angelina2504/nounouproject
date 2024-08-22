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

        res.json({ success: true, user: { id: user.id, email: user.email} });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
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

// FIXME est-ce que c'est utile ici ? et si oui, est-ce que c'est bien fait ? A checker
const checkAuth = (req, res) => {
    res.json({authenticated: true})
}; 

module.exports = { login, register, checkAuth };
