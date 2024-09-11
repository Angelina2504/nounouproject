const userRepository = require('../models/userRepository');

// Browse all tutors
const browse = async (req, res) => {
    try {
        // retrieve current user id from session 
        const userId = req.session.user.id;

        // Get all tutors from the database
        const user = await userRepository.readAllForUser(userId);

        // Respond with the tutors in JSON format
        res.status(200).json({ success: true, user: user });
    } catch (err) {
        // In case of an error, log it and return an error response
        console.error("Error during browsing user:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Get a tutor by its id
const read = async (req, res) => {
    try {

        // Search tutor by id
        const tutor = await userRepository.read(req.params.id);

        // If the tutor is not found, return an error response
        if (tutor == null) {
            res.status(404).json({ success: false, message: "User not found" });
        } else {
            // In case of success, return the tutor in JSON format
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
    browse,
    read,
    edit
}
