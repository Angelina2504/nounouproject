const pool = require("../database/db_connection")

class AbstractRepository {
  constructor({ table }) {
    // https://www.codeheroes.fr/2017/11/08/js-classes-abstraites-et-interfaces/
    if (this.constructor === AbstractRepository) {
      throw new TypeError(
        "Abstract class 'AbstractRepository' cannot be instantiated directly"
      );
    }

    this.table = table;

    this.databasePool = pool;
  }
}

module.exports = AbstractRepository;