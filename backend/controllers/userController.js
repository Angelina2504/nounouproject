const userRepository = require('../models/userRepository');


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

module.exports = {
    myProfile,
    edit
}
