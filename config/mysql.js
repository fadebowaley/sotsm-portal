const { Sequelize } = require("sequelize");

// Database configuration
const sequelize = new Sequelize("churchdb", "root", "Ad3m0l@000", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false, // Disable Sequelize's default timestamps
  },
  pool: {
    max: 10, // Maximum number of connections in the pool
    min: 0, // Minimum number of connections in the pool
    acquire: 30000, // Maximum time (in milliseconds) that a connection can be idle before being released
    idle: 10000, // Maximum time (in milliseconds) that a connection can be idle before being released
  },
});

// Check the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to the MySQL server.");
  } catch (error) {
    console.error("Error connecting to the MySQL server:", error);
  }
})();


module.exports = sequelize;
