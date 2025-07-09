const fs = require("fs");
const path = require("path");
const pool = require("./db_connection");

const initializeDatabase = async () => {

  let connection;

  try {
    // Load the schema and samples SQL files
    const schemaPath = path.join(__dirname, "schema.sql");
    const samplesPath = path.join(__dirname, "samples.sql");

    const schemaSql = fs.readFileSync(schemaPath, "utf-8");
    const samplesSql = fs.readFileSync(samplesPath, "utf-8");

    const schemaQueries = schemaSql
      .split(";")
      .map((query) => query.trim())
      .filter((query) => query.length);
    const samplesQueries = samplesSql
      .split(";")
      .map((query) => query.trim())
      .filter((query) => query.length);

    connection = await pool.getConnection();

    // Execute schema queries
    for (const query of schemaQueries) {
      await connection.query(query);
    }
    // Execute samples queries
    for (const query of samplesQueries) {
      await connection.query(query);
    }

    console.log("================================");
    console.log("/!\\ TABLES HAS BEEN DROPPED!");
    console.log("================================");
    console.log("Database initialized successfully!");
  } catch (error) {
    console.error("Error initializing database:", error);
  } finally {
    // Be sure to release the connection when finished if it was acquired
    if (connection) {
      connection.release();
    }
    // And properly close the pool, this is mandatory to end the Node.js process and prevent
    // it from hanging indefinitely (the terminal would not return to the prompt if the pool is not closed)
    await pool.end();
  }
};

module.exports = { initializeDatabase };
// initializeDatabase();
