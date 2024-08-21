const AbstractRepository = require("./AbstractRepository");

class ChildRepository extends AbstractRepository {
  constructor() {
    super({ table: "child" });
  }

  async create(child) {
    const [result] = await this.databasePool.query(
      `insert into ${this.table} (lastname, firstname, birthdate, allergy, user_id) values (?, ?, ?, ?, ?)`,
      [child.lastname, 
       child.firstname,
       child.bithdate,
       child.allergy,
       child.user_id]
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

  async readAll() {
    const [rows] = await this.databasePool.query(`select * from ${this.table}`);

    return rows;
  }

  async update(child) {
    const [result] = await this.databasePool.query(
      `update ${this.table} set lastname = ?, firstname = ?, birthdate = ?,  allergy = ?, user_id = ? where id = ?`,
      [child.lastname,
       child.firstname,
       child.birthdate,
       child.allergy,
       child.user_id]
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

module.exports = ChildRepository;