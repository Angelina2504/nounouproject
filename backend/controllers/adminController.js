const userRepository = require('../models/userRepository');

// Get all families, that is to say all children and their tutors for each user
const getFamilies = async (req, res) => {
    try {
        // Get all users from the database
        const families = await userRepository.getFamilies();

        // Respond with the users in JSON format
        res.status(200).json({ success: true, families: families });
    } catch (err) {
        // In case of an error, log it and return an error response
        console.error("Error during browsing families:", err);
        res.status(500).json({ success: false, message: `Internal server error ${err.message}` });
    }
};

module.exports = {
    getFamilies
};
