const mysql = require("mysql2/promise");

// Database configuration
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "Ad3m0l@000",
  database: "churchdb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Create connection pool
const pooler = mysql.createPool(dbConfig);

// Check for connection errors
pool
  .getConnection()
  .then((connection) => {
    console.log("Connected to the MySQL server.");
    connection.release();
  })
  .catch((error) => {
    console.error("Error connecting to the MySQL server:", error);
  });

module.exports = pooler;
