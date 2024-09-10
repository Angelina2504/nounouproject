const tutorRepository = require('../models/tutorRepository');

// Browse all tutors
const browse = async (req, res) => {
    try {
        // retrieve current user id from session 
        const userId = req.session.user.id;

        // Get all tutors from the database
        const tutors = await tutorRepository.readAllForUser(userId);

        // Respond with the tutors in JSON format
        res.status(200).json({ success: true, tutors: tutors });
    } catch (err) {
        // In case of an error, log it and return an error response
        console.error("Error during browsing tutors:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Get a tutor by its id
const read = async (req, res) => {
    try {

        // Search tutor by id
        const tutor = await tutorRepository.read(req.params.id);

        // If the tutor is not found, return an error response
        if (tutor == null) {
            res.status(404).json({ success: false, message: "Tutor not found" });
        } else {
            // In case of success, return the tutor in JSON format
            res.status(200).json({ success: true, tutor: tutor });
        }
    } catch (err) {
        // In case of an error, log it and return an error response
        console.error("Error during reading tutor:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

// Edit a tutor by its id
const edit = async (req, res) => {
    // Extract the tutor data from the request body
    const tutor = req.body;

    tutor.userid = req.session.user.id;

    try {
        // Update the tutor in the database
        await tutorRepository.update(tutor);

        // Respond with HTTP 204 (No Content)
        res.sendStatus(204);
    } catch (err) {
        // In case of an error, log it and return an error response
        console.error("Error during editing tutor:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

// Add a new tutor
const add = async (req, res) => {
    // Extract the tutor data from the request body
    const childId = req.body.childId;
    const tutor = req.body.tutor;

    tutor.userId = req.session.user.id; 

    try {
        
        // Insert the tutor into the database
        const insertId =  await tutorRepository.create(tutor, childId);

        // Respond with HTTP 201 (Created) and the ID of the newly inserted tutor
        res.status(201).json({ success: true, tutorId: insertId });
    } catch (err) {
        // In case of an error, log it and return an error response
        console.error("Error during adding tutor:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

// Delete a tutor by its id
const destroy = async (req, res) => {
    // Extract the tutorId data from the request body
    const tutorId = req.params.id;

    try {
        // Delete the tutor from the database
        const result = await tutorRepository.delete(tutorId);

        // If the tutor is not found, return an error response
        if (result && result.affectedRows <= 0) {
            res.status(404).json({ success: false, message: "Tutor not found" });
        } else {
            // In case of success, return an empty response
            res.sendStatus(204);
        }
    } catch (err) {
        // In case of an error, log it and return an error response
        console.error("Error during deleting tutor:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

module.exports = {
    browse,
    read,
    edit,
    add,
    destroy
}
