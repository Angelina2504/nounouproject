const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
    constructor() {
      super({ table: "user" });
    }

async findOneByEmail (email) {

    const [rows] = await this.databasePool.query(`SELECT * FROM ${this.table} WHERE email = ?`, [email]);

    return rows[0] || null; // Retourne le premier utilisateur trouvé ou null s'il n'y en a pas*/
};

async createUser (user) {
    try {
       
        const result = await this.databasePool.query(
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
}

module.exports = UserRepository;
