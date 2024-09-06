const childRepository = require('../models/childRepository');

// Browse all children for authenticated user
const browseForUser = async (req, res) => {
    try {

        // retrieve current user id from session 
        const userId = req.session.user.id;

        // Get all childrenfor authenticated user from the database
        const children = await childRepository.readAllForUser(userId);

        // Respond with the children in JSON format
        re(200).json({ success: s.statustrue, children: children });
    } catch (err) {
        // In case of an error, log it and return an error response
        console.error("Error during browsing children:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Get a child by its id
const read = async (req, res) => {
    try {
        // Search child by id
        const child = await childRepository.read(req.params.id);

        // If the child is not found, return an error response
        if (child == null) {
            res.status(404).json({ success: false, message: "Child not found" });
        } else {
            // In case of success, return the child in JSON format
            res.status(200).json({ success: true, child: child });
        }
    } catch (err) {
        // In case of an error, log it and return an error response
        console.error("Error during reading child:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

// Edit a child by its id
const edit = async (req, res) => {
    // Extract the child data from the request body
    const child = req.body;

    try {
        // Update the child in the database
        await childRepository.update(child);

        // Respond with HTTP 204 (No Content)
        res.sendStatus(204);
    } catch (err) {
        // In case of an error, log it and return an error response
        console.error("Error during editing child:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

// Add a new child
const add = async (req, res) => {
    // Extract the child data from the request body
    const { child } = req.body;

    child.userId = req.session.user.id;

    try {
        // Insert the child into the database
        const insertId = await childRepository.create(child);

        // Respond with HTTP 201 (Created) and the ID of the newly inserted child
        res.status(201).json({ success: true, childId: insertId });
    } catch (err) {
        // In case of an error, log it and return an error response
        console.error("Error during adding child:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

// Delete a child by its id
const destroy = async (req, res) => {
    // Extract the childId data from the request body
    const childId = req.params.id;

    try {
        // Delete the child from the database
        const result = await childRepository.delete(childId);

        // If the child is not found, return an error response
        if (result && result.affectedRows <= 0) {
            res.status(404).json({ success: false, message: "Child not found" });
        } else {
            // In case of success, return an empty response
            res.sendStatus(204);
        }
    } catch (err) {
        // In case of an error, log it and return an error response
        console.error("Error during deleting child:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

module.exports = {
    browseForUser,
    read,
    edit,
    add,
    destroy
}
