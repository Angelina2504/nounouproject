const AbstractRepository = require("./AbstractRepository");

class EmergencyRepository extends AbstractRepository {
  constructor() {
    super({ table: "emergency_contact" });
  }

  async create(emergency_contact) {
    const [result] = await this.database.query(
      `insert into ${this.table} (lastname, firstname, relationship, address, phone_number) values (?, ?, ?, ?, ?)`,
      [emergency_contact.lastname, 
       emergency_contact.firstname,
       emergency_contact.relationship,
       emergency_contact.address,
       emergency_contact.phone_number]
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

  async update(emergency_contact) {
    const [result] = await this.database.query(
      `update ${this.table} set lastname = ?, firstname = ?, birthdate = ?,  relationship = ?, address = ?, phone_number = ? where id = ?`,
      [emergency_contact.lastname,
       emergency_contact.firstname,
       emergency_contact.relationship,
       emergency_contact.address,
       emergency_contact.phone_number]
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

module.exports = EmergencyRepository;