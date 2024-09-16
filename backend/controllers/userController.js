const userRepository = require('../models/userRepository');
const argon2 = require("argon2");


// Get a user by its id
const myProfile = async (req, res) => {
    try {
        // retrieve current user id from session
        const userId = req.session.user.id;

        // Search user by id
        const user = await userRepository.readForProfile(userId);

        // If the user is not found, return an error response
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
        } else {
            // In case of success, return the user in JSON format
            res.status(200).json({ success: true, user: user });
        }
    } catch (err) {
        // In case of an error, log it and return an error response
        console.error("Error during reading user:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

/**
 * Update a user in the database.
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const edit = async (req, res) => {
    // Extract the user data from the request body
    const user = req.body;

    // retrieve current user id from session
    user.id = req.session.user.id;

    try {
        // Update the user in the database
        await userRepository.update(user);

        // Respond with HTTP 204 (No Content)
        res.sendStatus(204);
    } catch (err) {
        // In case of an error, log it and return an error response
        console.error("Error during editing user:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

/**
 * Update a user in the database.
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const editFromAdmin = async (req, res) => {
    // Extract the user data from the request body
    // Since we're editing a user from admin, we expect to have the userId within the payload
    const user = req.body;

    try {
        // Update the user in the database
        await userRepository.update(user);

        // Respond with HTTP 204 (No Content)
        res.sendStatus(204);
    } catch (err) {
        // In case of an error, log it and return an error response
        console.error("Error during editing user:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

// Delete a user by its id
const destroy = async (req, res) => {
    // Extract the userId data from the request body
    const userId = req.params.id;

    try {
        // Delete the user from the database
        const result = await userRepository.delete(userId);

        // If the user is not found, return an error response
        if (result && result.affectedRows <= 0) {
            res.status(404).json({success: false, message: "User not found"});
        } else {
            // In case of success, return an empty response
            res.sendStatus(204);
        }
    } catch (err) {
        // In case of an error, log it and return an error response
        console.error("Error during deleting user:", err);
        res.status(500).json({success: false, message: "Internal server error"});
    }
};

const checkDelete = async (req, res) => {
        const { password } = req.body;
        const userId = req.session.user.id;

        try {
            const user = await userRepository.findOneById(userId);

            if (!user) {
                return res.status(401).json({ success: false, message: "Invalid credentials" });
            }

            const passwordMatch = await argon2.verify(user.password, password);

            if (!passwordMatch) {
                return res.status(401).json({ success: false, message: "Invalid credentials" });
            }

            await userRepository.delete(userId);
            req.session.destroy(); // Détruire la session après suppression
            return res.status(200).json({ success: true, message: "Compte supprimé avec succès" });

            } catch (error) {
            console.error("Error during deleting:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    };


module.exports = {
    myProfile,
    edit,
    editFromAdmin,
    checkDelete,
    destroy
};
