const AbstractRepository = require("./abstractRepository");

class ChildRepository extends AbstractRepository {
  constructor() {
    super({ table: "child" });
  }

  async create(child) {
   
    const [result] = await this.databasePool.query(
        `insert into ${this.table} (firstname, lastname, birthdate, allergy) values (?, ?, ?, ?)`,
        [
            child.firstname,
            child.lastname,
            child.birthdate,
            child.allergy
            /*child.userId */
        ]
      ); 

      return result.insertId;
    }


  async read(id) {
    const [rows] = await this.databasePool.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    return rows[0];
  }

  async readAllForUser(userId) {
    const [rows] = await this.databasePool.query(
        `select * from ${this.table} where user_id = ?`,
        [userId]
    );

    return rows;
  }

  async update(child) {
    const [result] = await this.databasePool.query(
      `update ${this.table} set firstname = ?, lastname = ?, birthdate = ?,  allergy = ?, user_id = ? where id = ?`,
      [
          child.firstname,
          child.lastname,
          child.birthdate,
          child.allergy,
          child.userId
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

module.exports = new ChildRepository();
