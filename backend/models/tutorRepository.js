const abstractRepository = require("./abstractRepository");

class tutorRepository extends abstractRepository {
  constructor() {
    super({ table: "tutor" });
  }

  async create(tutor) {
    const [result] = await this.database.query(
      `insert into ${this.table} (firstname, lastname, phone_nomber, address) values (?, ?, ?, ?)`,
      [tutor.firstname,
        tutor.lastname, 
        tutor.phone_number,
        tutor.address]
    );

    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);

    return rows;
  }

  async update(tutor) {
    const [result] = await this.database.query(
      `update ${this.table} set firstname = ?, lastname = ?, phone_number = ?, address = ?  where id = ?`,
      [tutor.firstname,
        tutor.lastname, 
        tutor.phone_number,
        tutor.address]
    );

    return result.affectedRows;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );

    return result.affectedRows;
  }
}

module.exports = tutorRepository;