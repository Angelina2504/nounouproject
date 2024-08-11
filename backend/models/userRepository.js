const pool = require("../database/db_connection")

const findOneByEmail = async (email) => {

    const [rows] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);

    return rows[0] || null; // Retourne le premier utilisateur trouvé ou null s'il n'y en a pas*/
};

const createUser = async (user) => {
    try {
       
        const result = await pool.query(
            "INSERT INTO user(firstname, lastname, email, password, phone_number, address) VALUES (?, ?, ?, ?, ?, ?)",
            [
                user.firstname,
                user.lastname,
                user.email,
                user.password,
                user.phoneNumber,
                user.address
            ]
        );
        
        return result[0].insertId;
    } catch (error) {
        console.error("Error creating user", error);
        throw error;
    }
}
 


module.exports = { findOneByEmail, createUser };
