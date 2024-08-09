const abstractRepository = require("./AbstractRepository");

class childRepository extends abstractRepository {
  constructor() {
    super({ table: "child" });
  }

  async create(child) {
    const [result] = await this.database.query(
      `insert into ${this.table} (lastname, firstname, birthdate, allergy, user_id) values (?, ?)`,
      [child.lastname, 
       child.firstname,
       child.bithdate,
       child.allergy,
       child.user_id]
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

  async update(child) {
    const [result] = await this.database.query(
      `update ${this.table} set lastname = ?, firstname = ?, birthdate = ?,  allergy = ?, user_id = ? where id = ?`,
      [plugs.volt_power, plugs.plug_type_id, plugs.id]
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

module.exports = childRepository;