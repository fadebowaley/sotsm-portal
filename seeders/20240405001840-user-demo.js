const fs = require("fs");
const csv = require("csv-parser");
const { UserData } = require("../models");

async function seedDatabase() {
  // Path to your CSV file
  const csvFilePath =
    "/Users/fadebowaley/Desktop/ExperienceSurvey/UserData.csv";

  // Read CSV file row by row
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", async (row) => {
      try {
        // Create a new record using your UserData model
        await UserData.create({
          // Map CSV columns to model attributes
          /**
           * firstName,
           * lastName,
           * emailVerificationToken,
           * password,
           * createdAt,
           * updatedAt,
           * emailVerificationTokenExpiresAt,
           * phoneNumber
           * 
           */
          firstName: row.firstName,
          lastName: row.lastName,
          emailVerificationToken: row.emailVerificationToken,
          password: row.password,
          createdAt: new Date(row.createdAt), // Assuming createdAt is a date string in the CSV
          updatedAt: new Date(row.updatedAt), // Assuming updatedAt is a date string in the CSV
          emailVerificationTokenExpiresAt: new Date(
            row.emailVerificationTokenExpiresAt
          ), // Assuming emailVerificationTokenExpiresAt is a date string in the CSV
          phoneNumber: row.phoneNumber,
          // Add more attributes as needed
        });
      } catch (error) {
        console.error("Error seeding data:", error);
      }
    })
    .on("end", () => {
      console.log("CSV file successfully processed");
    });
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Call the seed function to populate the database
    await seedDatabase();
  },

  down: async (queryInterface, Sequelize) => {
    // Add rollback logic here if needed
    // This is optional and depends on your requirements
  },
};
