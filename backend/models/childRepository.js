const AbstractRepository = require("./abstractRepository");

class ChildRepository extends AbstractRepository {
  constructor() {
    super({ table: "child" });
  }

  async create(child) {

    const [result] = await this.databasePool.query(
        `insert into ${this.table} (firstname, lastname, birthdate, allergy, gender, user_id) values (?, ?, ?, ?, ?, ?)`,
        [
          child.firstname,
          child.lastname,
          child.birthdate,
          child.allergy,
          child.gender,
          child.userId
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
      `update ${this.table} set firstname = ?, lastname = ?, birthdate = ?,  allergy = ?, gender = ?, user_id = ? where id = ?`,
      [
          child.firstname,
          child.lastname,
          child.birthdate,
          child.allergy,
          child.gender,
          child.userId,
          child.id
      ]
    );

    return result.affectedRows;
  }

  async delete(id) {

      const totalResult = {
          affectedRowsInChild: 0,
          affectedRowsInTutor: 0
      };


      // Get a connection from the pool, we need to handle a transaction here
      const connection = await this.databasePool.getConnection();

      try {
          // On commence la transaction
          await connection.beginTransaction();

          // 1 - Delete child
          const [result] = await connection.query(
              `delete from ${this.table} where id = ?`,
              [id]
          );

          // Set the number of affected rows for child table
          totalResult.affectedRowsInChild = result.affectedRows;

          // 2 - Find tutors that no longer have children and delete them
          const [tutorsWithoutChildren] = await connection.query(
              `select t.id 
               from tutor t
               left join tutor_child tc on t.id = tc.tutor_id
               where tc.child_id is null`
          );

          // 3 - Delete tutors without children
          if (tutorsWithoutChildren && tutorsWithoutChildren.length > 0) {
              for (const tutor of tutorsWithoutChildren) {
                  // Do not call tutorRepository.delete() because we need to use the same connection
                  // since we are in a transaction.
                  const [deleteResult] = await connection.query(
                      `delete from tutor where id = ?`, [tutor.id]
                  );
                  totalResult.affectedRowsInTutor += deleteResult.affectedRows;
              }
          }

          // Commmit the transaction
          await connection.commit();

          return totalResult ;
      } catch (error) {
          await connection.rollback();
          console.error("Error deleting child", error);
          throw error;
      } finally {
          connection.release();
      }
  }
}

module.exports = new ChildRepository();
