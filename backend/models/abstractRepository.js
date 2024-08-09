const database = require("../../frontend");

class AbstractRepository {
  constructor({ table }) {
    // https://www.codeheroes.fr/2017/11/08/js-classes-abstraites-et-interfaces/
    if (this.constructor === AbstractRepository) {
      throw new TypeError(
        "Abstract class 'AbstractRepository' cannot be instantiated directly"
      );
    }

    this.table = table;

    this.database = database;
  }
}

module.exports = AbstractRepository;