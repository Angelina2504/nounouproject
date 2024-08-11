const AbstractRepository = require("./AbstractRepository");

class TutorRepository extends AbstractRepository {
    constructor() {
        super({ table: "tutor" });
        this.tableChildAssociation = "tutor_child"; // for association table tutor_child
    }

    async create(tutor, childId) {

        // On doit faire 2 inset into à la suite, donc on s'assure que soit les 2 passent, soit aucun des 2 en encapsulant
        // les query dans une transaction, et en n'oubliant pas de fermer la connexion à la fin
        const connection = await this.databasePool.getConnection();

        try {
            // On ouvre la transaction
            await connection.beginTransaction();

            const [result] = await this.databasePool.query(
                `insert into ${this.table}(firstname, lastname, email, phone_number, address, user_id)
                 values (?, ?, ?, ?, ?, ?)`,
                [
                    tutor.firstname,
                    tutor.lastname,
                    tutor.email,
                    tutor.phoneNumber,
                    tutor.address,
                    tutor.userId
                ]
            );

            if (result && result.insertId) {
                await this.databasePool.query(
                    `insert into ${this.tableAssociation}(tutor_id, child_id)
                     values (?, ?)`,
                    [
                        result.insertId,
                        childId
                    ]
                );
            }

            // On commit la transaction
            await connection.commit();

            return result.insertId;
        } catch (error) {
            // En cas d'erreur on rollback la transaction et on annule les changements
            await connection.rollback();
            console.error("Error creating tutor", error);
            throw error;
        } finally {
            // On ferme la connexion, qu'il y ait une erreur ou non
            connection.release();
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

    async readAll() {
        const [rows] = await this.databasePool.query(
            `select * from ${this.table}`
        );

        return rows;
    }

    async update(tutor) {
        const [result] = await this.databasePool.query(
            `update ${this.table} 
             set firstname = ?, lastname = ?, email = ?, phone_number = ?, address = ?, user_id = ?
             where id = ?`,
            [
                tutor.firstname,
                tutor.lastname,
                tutor.email,
                tutor.phoneNumber,
                tutor.address,
                tutor.userId
            ]
        );

        return result.affectedRows;
    }

    async delete(id) {
        const [result] = await this.databasePool.query(
            `delete from ${this.table} where id = ?`,
            [id]
        );

        return result.affectedRows;
    }
}

module.exports = TutorRepository;
