const AbstractRepository = require("./abstractRepository");

class EmergencyContactRepository extends AbstractRepository {
    constructor() {
        super({ table: 'emergency_contact' });
        this.tableChildAssociation = 'child_emergency_contact'; // for association table child_emergency_contact
    }

    /**
     * Create an emergency contact for a child
     * @param contact
     * @returns {Promise<number>}
     */
    async create(contact) {
        const connection = await this.databasePool.getConnection();

        try {
            // Begin the transaction
            await connection.beginTransaction();

            // Check if the child is associated with the user
            const [childRows] = await connection.query(
                `select id 
                 from child 
                 where id = ? 
                 and user_id = ?`,
                [
                    contact.childId,
                    contact.userId
                ]
            )

            if (childRows.length === 0) {
                throw new Error("Cet enfant n'est pas rattaché à l'utilisateur connecté.");
            }

            // Insert the emergency contact into the emergency_contact table
            const [result] = await connection.query(
                `insert into ${this.table} (
                   firstname, 
                   lastname, 
                   gender, 
                   relationship,
                   phone_number, 
                   address
                ) 
                 values (?, ?, ?, ?, ?, ?)`,
                [
                    contact.firstname,
                    contact.lastname,
                    contact.gender,
                    contact.relationship,
                    contact.phone_number,
                    contact.address
                ]
            );

            const contactId = result.insertId;

            // Insert the association between the child and the emergency contact into the child_emergency_contact table
            await connection.query(
                `insert into ${this.tableChildAssociation} (
                   child_id, 
                   contact_id
                ) 
                 values (?, ?)`,
                [
                    contact.childId,
                    contactId
                ]
            );

            // Commit the transaction
            await connection.commit();

            return contactId;

        } catch (error) {
            // If an error occurs, rollback the transaction and log the error
            await connection.rollback();
            console.error("Error creating emergency contact", error);
            throw error;
        } finally {
            // Close the connection, whether there was an error or not
            connection.release();
        }
    };

    /**
     * Read all emergency contacts for the children of a user
     * @param userId
     * @returns {Promise<*[]>}
     */
    async readAllForUser(userId) {

        const connection = await this.databasePool.getConnection();

        try {
            // begin the transaction
            await connection.beginTransaction();

            const [rows] = await connection.query(
                `select 
                    c.id as child_id,
                    c.firstname as child_firstname,
                    c.lastname as child_lastname,
                    c.birthdate as child_birthdate,
                    c.gender as child_gender,
                    c.allergy as child_allergy,
                    
                    ec.id as emergency_contact_id,
                    ec.firstname as emergency_contact_firstname,
                    ec.lastname as emergency_contact_lastname,
                    ec.gender as emergency_contact_gender,
                    ec.relationship as emergency_contact_relationship,
                    ec.address as emergency_contact_address,
                    ec.phone_number as emergency_contact_phone_number

                 from child_emergency_contact cec
                 left join child c on cec.child_id = c.id
                 left join emergency_contact ec on ec.id = cec.contact_id
                 where c.user_id = ?`
                , [userId]
            );

            // Initialiser un objet pour regrouper les enfants avec leurs contacts d'urgence
            const childrenContacts = [];

            // This is to keep track of children we have already handled, to avoid duplicates. If we have
            // the same child_id, then we are handling another tutor for this child
            let childrenAlreadyHandled = [];

            // Parcourir les résultats et regrouper les données par enfant
            rows.forEach(row => {
                if (row.child_id) {
                    // Check if this child is already in the array of already handled children
                    let currentChild = childrenAlreadyHandled.find(c => c.id === row.child_id);

                    // If not, create a new child entry with an empty contacts array
                    if (!currentChild) {
                        currentChild = {
                            id: row.child_id,
                            firstname: row.child_firstname,
                            lastname: row.child_lastname,
                            birthdate: row.child_birthdate,
                            gender: row.child_gender,
                            allergy: row.child_allergy,
                            emergency_contacts: []  // Initialiser un tableau pour les contacts
                        };

                        // Add the emergency contact to the child
                        if (row.emergency_contact_id) {
                            const emergencyContact = {
                                id: row.emergency_contact_id,
                                firstname: row.emergency_contact_firstname,
                                lastname: row.emergency_contact_lastname,
                                gender: row.emergency_contact_gender,
                                relationship: row.emergency_contact_relationship,
                                address: row.emergency_contact_address,
                                phone_number: row.emergency_contact_phone_number
                            };
                            currentChild.emergency_contacts.push(emergencyContact);
                        }

                        // Add currentChild to already handled children to avoid duplicates on next iterations
                        childrenAlreadyHandled.push(currentChild);
                        // And also add the child to the final childrenContacts result
                        childrenContacts.push(currentChild);
                    } else {
                        // If we already have handle a child with this id, we just need to add the contact to the child
                        if (row.emergency_contact_id) {
                            const emergencyContact = {
                                id: row.emergency_contact_id,
                                firstname: row.emergency_contact_firstname,
                                lastname: row.emergency_contact_lastname,
                                gender: row.emergency_contact_gender,
                                relationship: row.emergency_contact_relationship,
                                address: row.emergency_contact_address,
                                phone_number: row.emergency_contact_phone_number
                            };

                            // Find the child in the childrenContacts array and add the emergency contact
                            childrenContacts
                                .find(c => c.id === row.child_id)
                                .emergency_contacts.push(emergencyContact);
                        }
                    }
                }
            });

            // Fin de la transaction
            await connection.commit();

            return childrenContacts;
        } catch (error) {
            // In case of an error, rollback transaction and, log error and return it in response
            await connection.rollback();
            console.error("Error reading all emergency contacts for user", error);
            throw error;
        } finally {
            // Close the connection, whether there was an error or not
            connection.release();
        }
    }

    /**
     * Update an emergency contact once we checked that the child is associated with the user
     * @param contact
     * @returns {Promise<number>}
     */
    async update(contact) {

        // We need to handle a transaction here because there are multiple queries
        // on multiple tables (emergency_contact and child_emergency_contact)
        const connection = await this.databasePool.getConnection();

        try {
            // Begin the transaction
            await connection.beginTransaction();

            const [childRows] = await connection.query(
                `select id from child
                 where id = ? 
                   and user_id = ?`,
                [
                    contact.childId,
                    contact.userId
                ]
            );

            // If the child is not associated with the user, throw an error
            if (childRows.length === 0) {
                throw new Error("Cet enfant n'est pas rattaché à l'utilisateur connecté.");
            }

            // Update the emergency contact
            const [result] = await connection.query(
                `update ${this.table}
                 set firstname    = ?,
                     lastname     = ?,
                     gender       = ?,
                     relationship = ?,
                     phone_number = ?,
                     address      = ?
                 where id = ?`,
                [
                    contact.firstname,
                    contact.lastname,
                    contact.gender,
                    contact.relationship,
                    contact.phone_number,
                    contact.address,
                    contact.id
                ]
            );

            // Commit the transaction and return the id of the updated emergency contact
            await connection.commit();

            return result.affectedRows;

        } catch (error) {
            // If an error occurs, rollback the transaction and log the error
            connection.rollback();
            console.error("Error updating emergency contact", error);
            throw error;
        } finally {
            // Close the connection, whether there was an error or not
            connection.release();
        }
    }

    async delete(contactId, childId, userId) {
        // We need to handle a transaction here because we have multiple queries
        const connection = await this.databasePool.getConnection();

        try {
            // Begin the transaction
            await connection.beginTransaction();

            // Check if the child belongs to the user
            const [childRows] = await connection.query(
                `select id 
                 from child 
                 where id = ? 
                   and user_id = ?`,
                [childId, userId]
            );

            // If the child does not belong to the user, throw an error
            if (childRows.length === 0) {
                throw new Error("Cet enfant n'appartient pas à l'utilisateur connecté.");
            }

            // Check if the emergency contact is associated with the child
            const [associationRows] = await connection.query(
                `select * 
                 from ${this.tableChildAssociation} 
                 where child_id = ? 
                   and contact_id = ?`,
                [childId, contactId]
            );

            // If the emergency contact is not associated with the child, throw an error
            if (associationRows.length === 0) {
                throw new Error("Le contact d'urgence n'est pas associé à cet enfant.");
            }

            // Delete the emergency contact if everything is OK
            const [result] = await connection.query(
                `delete 
                 from ${this.table} 
                 where id = ?`,
                [contactId]
            );

            // Commit the transaction
            await connection.commit();

            return result.affectedRows;

        } catch (error) {
            // If an error occurs, rollback the transaction and log the error
            await connection.rollback();
            console.error("Erreur lors de la suppression du contact d'urgence", error);
            throw error;
        } finally {
            // Close the connection, whether there was an error or not
            connection.release();
        }
    }
}

module.exports = new EmergencyContactRepository();
