const userRepository = require('../models/userRepository');

/**
 * Get all families, that is to say all children for each user
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getFamilies = async (req, res) => {
    try {
        // Get the search terms from the query parameters, if there are any
        const searchParam = req.query.search || '';

        // Get all users from the database
        const families = await userRepository.getFamilies(searchParam);

        // Respond with the users in JSON format
        res.status(200).json({ success: true, families: families });
    } catch (err) {
        // In case of an error, log it and return an error response
        console.error("Error during browsing families:", err);
        res.status(500).json({ success: false, message: `Internal server error ${err.message}` });
    }
};

/**
 * Get the details of a family, that is to say all children and their tutors for a specific user
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getFamilyDetails = async (req, res) => {
    try {
        // Get all information about the family from the database (children and tutors), for a given userId
        const userId = req.params.id || -1;
        const familyDetails = await userRepository.getFamilyDetails(userId);

        // Respond with the users in JSON format
        res.status(200).json({ success: true, familyDetails: familyDetails });
    } catch (err) {
        // In case of an error, log it and return an error response
        console.error("Error during browsing families:", err);
        res.status(500).json({ success: false, message: `Internal server error ${err.message}` });
    }
};

module.exports = {
    getFamilies,
    getFamilyDetails
};
