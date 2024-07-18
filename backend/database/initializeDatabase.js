const fs = require("fs");
const path = require("path");
const pool = require("./db_connection");

const initializeDatabase = async () => {
  try {
    const sqlPath = path.join(__dirname, "datas.sql");
    const sql = fs.readFileSync(sqlPath, "utf-8");

    const queries = sql
      .split(";")
      .map((query) => query.trim())
      .filter((query) => query.length);

    const connection = await pool.getConnection();
    for (const query of queries) {
      await connection.query(query);
    }
    connection.release();

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

module.exports = { initializeDatabase };