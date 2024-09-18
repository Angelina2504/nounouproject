const emergencyContactRepository = require('../models/emergencyContactRepository');

// Browse for a user's emergency contacts
const browseForUser = async (req, res) => {
    try {
        // retrieve current user id from session
        const userId = req.session.user.id;

        // Get all emergency contacts for authenticated user's children from the database
        const childrenEmergencyContacts = await emergencyContactRepository.readAllForUser(userId);

        // Respond with the emergency contacts in JSON format
        res.status(200).json({ success: true, childrenEmergencyContacts: childrenEmergencyContacts });
    } catch (error) {
        console.error("Error during browsing emergency contacts:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


// Browse for a user's emergency contacts
const browseForUserFromAdmin = async (req, res) => {
    try {
        // retrieve  user id from query parameters (/path/url?userId=XX)
        const userId = req.query.userId || -1;

        // Get all emergency contacts for authenticated user's children from the database
        const childrenEmergencyContacts = await emergencyContactRepository.readAllForUser(userId);

        // Respond with the emergency contacts in JSON format
        res.status(200).json({ success: true, childrenEmergencyContacts: childrenEmergencyContacts });
    } catch (error) {
        console.error("Error during browsing emergency contacts:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const add = async (req, res) => {
    // Extract the emergency contact data from the request body
    const { emergencyContact } = req.body;

    emergencyContact.userId = req.session.user.id;

    try {
        // Add the emergency contact to the database
        const emergencyContactId = await emergencyContactRepository.create(emergencyContact);

        // Respond with HTTP 201 (Created)
        res.status(201).json({ success: true, emergencyContactId: emergencyContactId });
    } catch (error) {
        console.error("Error during adding emergency contact:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

/**
 * Edit an emergency contact by its id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const edit = async (req, res) => {
    // Extract the emergency contact data from the request body
    const { emergencyContact } = req.body;

    emergencyContact.userId = req.session.user.id;

    try {
        // Update the emergency contact in the database
        await emergencyContactRepository.update(emergencyContact);

        // Respond with HTTP 204 (No Content)
        res.sendStatus(204);
    } catch (error) {
        console.error("Error during editing emergency contact:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const destroy = async (req, res) => {
    // Extract the emergency contact id from the request parameters
    const contactId = req.params.id;
    // Extract the child id from the request parameters
    const childId = req.query.childId;
    // Extract the user id from the session
    const userId = req.session.user.id;

    try {
        // Delete the emergency contact from the database
        const result = await emergencyContactRepository.delete(contactId, childId, userId);

        // If the emergency contact is not found, return an error response
        if (result && result.affectedRows <= 0) {
            res.status(404).json({ success: false, message: "Emergency contact not found" });
        } else {
            // In case of success, return an empty response
            res.sendStatus(204);
        }
    } catch (error) {
        console.error("Error during deleting emergency contact:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = {
    browseForUser,
    browseForUserFromAdmin,
    add,
    edit,
    destroy
};
