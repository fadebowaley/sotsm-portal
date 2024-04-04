const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const User = require("../models/user");
const bcrypt = require("bcrypt");
const fs = require("fs/promises");
const saltRounds = 10;

//create user name username: admin, email, admin@admin, password adminadmin
const users = [
  {
    email: "customer@tripnest.com",
    role: "pastor",
    emailVerified: true,
    firstname: "John",
    lastname: "Doe",
    phone: "+1234567890",
    title: "Mr",
    created: new Date(),
    hotels: [], // Empty array for hotels
    // Add other attributes here
    password: "customer_password", // Set the desired password for the customer
  },
  {
    email: "admin@tripnest.com",
    role: "pastor",
    emailVerified: true,
    firstname: "Admin",
    lastname: "User",
    phone: "+9876543210",
    title: "Admin",
    created: new Date(),
    hotels: [], // Empty array for hotels
    // Add other attributes here
    password: "admin_password", // Set the desired password for the admin
  },
  {
    email: "manager@tripnest.com",
    role: "pastor",
    emailVerified: true,
    firstname: "Manager",
    lastname: "User",
    phone: "+9876543210",
    title: "Manager",
    created: new Date(),
    hotels: [], // Empty array for hotels
    // Add other attributes here
    password: "manager_password", // Set the desired password for the admin
  },
  {
    email: "super@tripnest.com",
    role: "superUser",
    emailVerified: true,
    firstname: "Super",
    lastname: "User",
    phone: "+9876543210",
    title: "Super",
    created: new Date(),
    hotels: [], // Empty array for hotels
    // Add other attributes here
    password: "super_password", // Set the desired password for the admin
  },
];

const seedUsers = async () => {
  try {
    await User.deleteMany({ email: { $regex: /@tripnest.com$/ } });
    console.log("All users deleted successfully!");

    for (const user of users) {
      user.password = await bcrypt.hash(user.password, saltRounds);
      await User.insertMany(user);
    }
    console.log("All users created successfully!");
  } catch (error) {
    console.error("Error seeding users:", error);
    process.exit(1);
  }
};

const dbSeed = async () => {
  try {
    // connect Database
    await seedUsers();

    console.log("Data seeded successfully . . . ");
    await fs.writeFile("seeded.txt", "true");
    console.log("flag set successfully");
    // await closeConnection();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

module.exports = dbSeed;
