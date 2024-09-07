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
