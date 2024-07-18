const pool = require("../database/db_connection")

const findOneByEmail = async (email) => {

const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

return rows/*.length ? rows[0] : null; // Retourne le premier utilisateur trouvé ou null s'il n'y en a pas*/
};

/* const createUser = async (user) => {
    try {
        const result = await pool.query(
            "INSERT INTO users (email, password, firstname, lastname) VALUES (?, ?, ?, ?)",
            [user.email, user.password, user.firstname, user.lastname]
        );
        return (result.insertId)
    } catch (error) {
        console.error("Error creating user", error);
        throw error;
    }
}
 */


module.exports = {findOneByEmail};