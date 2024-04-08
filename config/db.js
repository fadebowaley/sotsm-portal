const { Sequelize } = require("sequelize");

// Initialize Sequelize and connect to the database
const sequelize = new Sequelize(process.env.POSTGRES_URI, {
  dialect: "postgres", // Specify the PostgreSQL dialect explicitly
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log(
      "::::  [POSTGRESQL] Connection to the database has been established successfully."
    );
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
