const AbstractRepository = require("./AbstractRepository.js");

class UserRepository extends AbstractRepository {
    constructor() {
      super({ table: "tutor" });
    }

async findOneByEmail (email) {

    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    return rows[0] || null; // Retourne le premier utilisateur trouvé ou null s'il n'y en a pas*/
};

async createUser (user) {
    try {
       
        const result = await pool.query(
            "INSERT INTO users (email, password) VALUES (?, ?)",
            [user.email, user.password]
        );
        
        return result[0].insertId;
    } catch (error) {
        console.error("Error creating user", error);
        throw error;
    }
}
}

module.exports = UserRepository;