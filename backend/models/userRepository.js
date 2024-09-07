const AbstractRepository = require("./abstractRepository");

class UserRepository extends AbstractRepository {
    constructor() {
      super({ table: 'user' });
    }

    // ------------------------------
    // ----------- Admin ------------
    // ------------------------------
    async getFamilies() {
        // Query to get all users, and their attached children, except for admins,
        // ordered by user id, child id. Tutors will be added later in Family Details.
        const [rows] = await this.databasePool.query(
            `SELECT
                 u.id AS user_id,
                 u.firstname AS user_firstname,
                 u.lastname AS user_lastname,
                 u.email AS user_email,
                 u.phone_number AS user_phone_number,
                 u.address AS user_address,

                 c.id AS child_id,
                 c.firstname AS child_firstname,
                 c.lastname AS child_lastname,
                 c.birthdate AS child_birthdate,
                 c.gender AS child_gender,
                 c.allergy AS child_allergy
             FROM user u
                 LEFT JOIN child c ON u.id = c.user_id
             WHERE u.is_admin = FALSE
             ORDER BY u.id, c.id;`
        );

        // Group results by user, then children and tutors
        const families = [];
        let currentFamily = undefined;


        // Browse the rows and group them by user, then build the children and tutors (= families)
        rows.forEach(row => {
            // If it's a new user
            if (!currentFamily || currentFamily.user.id !== row.user_id) {
                // If there is a current family, push it before resetting for this iteration
                if (currentFamily) {
                    families.push(currentFamily);
                }

                // Structure of a family is : {user, children}
                currentFamily = {
                    user : {
                        id: row.user_id,
                        firstname: row.user_firstname,
                        lastname: row.user_lastname,
                        email: row.user_email,
                        phoneNumber: row.user_phone_number,
                        address: row.user_address
                    },
                    children: []
                };
            }

            // Add a child if there is one in the row
            if (row.child_id) {
                // Check if the child is already in the family, i.e. if we already added it
                // in the previous iteration in children array with the same child_id
                const child = currentFamily.children.find(child => child.id === row.child_id);

                // If the child is not already in the family, add it
                if (!child) {
                    // structure of a child is : {id, firstname, lastname, birthdate, gender, allergy, tutors}
                    currentFamily.children.push({
                        id: row.child_id,
                        firstname: row.child_firstname,
                        lastname: row.child_lastname,
                        birthdate: row.child_birthdate,
                        gender: row.child_gender,
                        allergy: row.child_allergy
                    });
                }
            }
        });

        // Don't forget to push the last family we worked on
        if (currentFamily) {
            families.push(currentFamily);
        }

        return families;
    };

    /**
     * Get the details of a family, i.e. the children and tutors for a user
     */
    async getFamilyDetails(userId) {

        // Big query to get all information about the family (children and tutors) for a given user
        const [rows] = await this.databasePool.query(
            `SELECT 
                u.id AS user_id,
                u.firstname AS user_firstname,
                u.lastname AS user_lastname,
                u.email AS user_email,
                u.phone_number AS user_phone_number,
                u.address AS user_address,
            
                c.id AS child_id,
                c.firstname AS child_firstname,
                c.lastname AS child_lastname,
                c.birthdate AS child_birthdate,
                c.gender AS child_gender,
                c.allergy AS child_allergy,
                
                t.id AS tutor_id,
                t.firstname AS tutor_firstname,
                t.lastname AS tutor_lastname,
                t.email AS tutor_email,
                t.phone_number AS tutor_phone_number,
                t.address AS tutor_address,
                t.gender AS tutor_gender
            
            FROM user u
            LEFT JOIN child c ON u.id = c.user_id
            LEFT JOIN tutor_child tc ON c.id = tc.child_id
            LEFT JOIN tutor t ON tc.tutor_id = t.id
            WHERE u.id = ?
            ORDER BY u.id, c.id, t.id;`
            // Parameter of the query, the user id
            , [userId]
        );

        // Structure of the family details is an object userDetails, and two arrays childrenDetails and tutorsDetails
        const familyDetails = {
            userDetails: {},
            childrenDetails: []
        };
        // All rows have same user informations, we need to get them only once
        let userDetailsAlreadyHandled = false;
        // This is to keep track of children we have already handled, to avoid duplicates. If we have
        // the same child_id, then we are handling another tutor for this child
        let childrenAlreadyHandled = [];

        // Browse the rows and group them by children and tutors
        rows.forEach(row => {
            // Fisrt time we handle the user informations
            if (!userDetailsAlreadyHandled) {
                // Directly set the user informations
                familyDetails.userDetails = {
                    id: row.user_id,
                    firstname: row.user_firstname,
                    lastname: row.user_lastname,
                    email: row.user_email,
                    phoneNumber: row.user_phone_number,
                    address: row.user_address,
                };
                // Set the flag to true to avoid handling the user informations again
                userDetailsAlreadyHandled = true;
            }

            // Handle children and their tutors
            if (row.child_id) {
                // Check if this child is already in the array
                let currentChild = childrenAlreadyHandled.find(c => c.id === row.child_id);

                // If not, create a new child entry with an empty tutors array
                if (!currentChild) {
                    currentChild = {
                        id: row.child_id,
                        firstname: row.child_firstname,
                        lastname: row.child_lastname,
                        birthdate: row.child_birthdate,
                        gender: row.child_gender,
                        allergy: row.child_allergy,
                        tutors: []
                    };

                    // Add the tutor to the currentChild if present
                    if (row.tutor_id) {
                        const tutorDetails = {
                            id: row.tutor_id,
                            firstname: row.tutor_firstname,
                            lastname: row.tutor_lastname,
                            email: row.tutor_email,
                            phoneNumber: row.tutor_phone_number,
                            address: row.tutor_address,
                            gender: row.tutor_gender
                        };
                        currentChild.tutors.push(tutorDetails);
                    }

                    // ADd currentChild to already handled children to avoid duplicates on next iterations
                    childrenAlreadyHandled.push(currentChild);
                    // And also add the child to the final childrenDetails of familyDetails result
                    familyDetails.childrenDetails.push(currentChild);
                } else {
                    // If we already have handle a child with this id, we just need to add the tutor to the child
                    if (row.tutor_id) {
                        const tutorDetails = {
                            id: row.tutor_id,
                            firstname: row.tutor_firstname,
                            lastname: row.tutor_lastname,
                            email: row.tutor_email,
                            phoneNumber: row.tutor_phone_number,
                            address: row.tutor_address,
                            gender: row.tutor_gender
                        };
                        // Find the child in the childrenDetails in familyDetails and add the tutor to its tutors array
                        familyDetails.childrenDetails
                            .find(c => c.id === row.child_id)
                            .tutors.push(tutorDetails);
                    }
                }
            }
        });

        return familyDetails;

    };

    // ------------------------------
    // ------- Standard User --------
    // ------------------------------
    async findOneByEmail (email) {

        const [rows] = await this.databasePool.query(`SELECT * FROM ${this.table} WHERE email = ?`, [email]);

        return rows[0] || null; // Retourne le premier utilisateur trouvé ou null s'il n'y en a pas*/
    };

    async createUser (user) {
        try {

            const [result] = await this.databasePool.query(
                `INSERT INTO ${this.table} (firstname, lastname, email, password, phone_number, address) VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    user.firstname,
                    user.lastname,
                    user.email,
                    user.password,
                    user.phoneNumber,
                    user.address
                ]
            );

            return result.insertId;
        } catch (error) {
            console.error("Error creating user", error);
            throw error;
        }
    }

    async read(id) {
        const [rows] = await this.databasePool.query(
            `select * from ${this.table} 
             where id = ?`,
            [id]
        );

        return rows[0];
    }
}

module.exports = new UserRepository();
