// CRUD operations for User model
const { User } = require("../models");
const { UserData } = require("../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { generateNextCode } = require("../middleware/utils");

const clcUser = {
  getUsers: async (req, res) => {
    try {
      // Extract page and limit from query parameters, default to 1 and 10 respectively
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      // Calculate offset based on page and limit
      const offset = (page - 1) * limit;

      // Retrieve users from the database with pagination
      const { rows: users, count } = await User.findAndCountAll({
        offset,
        limit,
        order: [["createdAt", "DESC"]], // Optional: Order users by createdAt date
      });

      // Calculate total pages based on total count and limit
      const totalPages = Math.ceil(count / limit);
      // Render the view with the list of users and pagination info
      res.render("admin/pastors", {
        users,
        totalPages,
        currentUser: req.user,
        currentPage: page,
        successMsg: req.flash("success")[0],
        errorMsg: req.flash("error")[0],
        pageName: "User list",
      });
    } catch (err) {
      console.error(err);
      req.flash("error", "Failed to fetch user data");
      res.redirect("/");
    }
  },

  getAuthUsers: async (req, res) => {
    try {
      // Extract page and limit from query parameters, default to 1 and 10 respectively
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 50;

      // Calculate offset based on page and limit
      const offset = (page - 1) * limit;

      // Retrieve users from the database with pagination
      const { rows: users, count } = await UserData.findAndCountAll({
        offset,
        limit,
        order: [["createdAt", "DESC"]], // Optional: Order users by createdAt date
      });

      // Calculate total pages based on total count and limit
      const totalPages = Math.ceil(count / limit);

      // Render the view with the list of users and pagination info
      res.render("admin/authPastors", {
        users,
        totalPages,
        currentUser: req.user,
        currentPage: page,
        successMsg: req.flash("success")[0],
        errorMsg: req.flash("error")[0],
        pageName: "Authorised User",
      });
    } catch (err) {
      console.error(err);
      req.flash("error", "Failed to fetch user data");
      res.redirect("/");
    }
  },

  //POST: createusers and authUser
  postCreateUser: async (req, res) => {
    const { userId } = req.body;
    const employeeId = await generateNextCode();
    hash_password = await bcrypt.hash("clcpassword", saltRounds);

    try {
      if (userId) {
        console.log("Check 1: There is UserID [] ==> [] ==> [] ==>");
        // Updating an existing user
        const user = await User.findOne({ where: { userId } });
        if (user) {
          console.log("update the user details . . .");
          //if user is present we update
          user.title = req.body.title;
          user.firstName = req.body.firstName;
          user.lastName = req.body.lastName;
          user.otherName = req.body.otherName;
          user.email = req.body.email;
          user.phoneNumber = req.body.phoneNumber;
          user.gender = req.body.gender;
          user.dateOfBirth = req.body.dateOfBirth;
          user.highestQualification = req.body.highestQualification;
          user.professional = req.body.professionalQualification;
          user.maritalStatus = req.body.maritalStatus;
          user.stateOfOrigin = req.body.stateOfOrigin;
          user.lgaOfOrigin = req.body.lgaOfOrigin;
          user.homeTown = req.body.homeTown;
          user.spouseName = req.body.spouseName;
          user.spousePhoneNumber = req.body.spousePhoneNumber;
          user.spouseDateOfBirth = req.body.spouseDateOfBirth;
          user.nextOfKinName = req.body.nextOfKinName;
          user.nextOfKinPhoneNumber = req.body.nextOfKinPhoneNumber;
          user.nextOfKinRelationship = req.body.nextOfKinRelationship;
          user.residentialAddress = req.body.residentialAddress;
          user.stateOfResidence = req.body.stateOfResidence;
          user.lgaOfResidence = req.body.lgaOfResidence;
          user.employmentCategory = req.body.employmentCategory;
          user.occupation = req.body.occupation;
          await user.save();
          return res.json({
            success: true,
            message: "Employee Record updated successfully!",
            redirectUrl: "/users",
          });
        } else {
          //create a new User
          console.log("create a new user  . . .");
          const {
            title,
            firstName,
            lastName,
            otherName,
            email,
            phoneNumber,
            gender,
            dateOfBirth,
            highestQualification,
            professionalQualification,
            maritalStatus,
            stateOfOrigin,
            lgaOfOrigin,
            homeTown,
            spouseName,
            spousePhoneNumber,
            spouseDateOfBirth,
            nextOfKinName,
            nextOfKinPhoneNumber,
            nextOfKinRelationship,
            residentialAddress,
            stateOfResidence,
            lgaOfResidence,
            employmentCategory,
            occupation,
            userId,
          } = req.body;
          //add the user to Database
          const newUser = await User.create({
            title,
            firstName,
            lastName,
            otherName,
            email,
            phoneNumber,
            gender,
            dateOfBirth,
            highestQualification,
            professional: professionalQualification,
            maritalStatus,
            stateOfOrigin,
            lgaOfOrigin,
            homeTown,
            spouseName,
            spousePhoneNumber,
            spouseDateOfBirth,
            nextOfKinName,
            nextOfKinPhoneNumber,
            nextOfKinRelationship,
            residentialAddress,
            stateOfResidence,
            lgaOfResidence,
            employmentCategory,
            occupation,
            employeeId: employeeId,
            createdAt: new Date("2024-04-09"),
            updatedAt: new Date("2024-04-09"),
            userId,
            emailVerificationTokenExpiresAt: new Date("2024-04-09"),
            password: hash_password,
          });
          console.log("user has been done perfectly . . ");
          return res.json({
            success: true,
            message: "User created successfully!",
            redirectUrl: "/users",
          });
        }
      } else {
        console.log("Check 2: There is No UserID [] ==> [] ==> [] ==>");
      }
    } catch (err) {
      console.error(err);
      console.log("error", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  // postCreateUser: async (req, res) => {
  //   const employeeId = await generateNextCode();
  //   hash_password = await bcrypt.hash("clcpassword", saltRounds);
  //   try {
  //     const {
  //       title,
  //       firstName,
  //       lastName,
  //       otherName,
  //       email,
  //       phoneNumber,
  //       gender,
  //       dateOfBirth,
  //       highestQualification,
  //       professionalQualification,
  //       maritalStatus,
  //       stateOfOrigin,
  //       lgaOfOrigin,
  //       homeTown,
  //       spouseName,
  //       spousePhoneNumber,
  //       spouseDateOfBirth,
  //       nextOfKinName,
  //       nextOfKinPhoneNumber,
  //       nextOfKinRelationship,
  //       residentialAddress,
  //       stateOfResidence,
  //       lgaOfResidence,
  //       employmentCategory,
  //       occupation,
  //       userId,
  //     } = req.body;

  //     const newUser = await User.create({
  //       title,
  //       firstName,
  //       lastName,
  //       otherName,
  //       email,
  //       phoneNumber,
  //       gender,
  //       dateOfBirth,
  //       highestQualification,
  //       professional: professionalQualification,
  //       maritalStatus,
  //       stateOfOrigin,
  //       lgaOfOrigin,
  //       homeTown,
  //       spouseName,
  //       spousePhoneNumber,
  //       spouseDateOfBirth,
  //       nextOfKinName,
  //       nextOfKinPhoneNumber,
  //       nextOfKinRelationship,
  //       residentialAddress,
  //       stateOfResidence,
  //       lgaOfResidence,
  //       employmentCategory,
  //       occupation,
  //       employeeId: employeeId,
  //       createdAt: new Date("2024-04-09"),
  //       updatedAt: new Date("2024-04-09"),
  //       userId,
  //       emailVerificationTokenExpiresAt: new Date("2024-04-09"),
  //       password: hash_password,
  //     });

  //     console.log("user has been done perfectly . . ");
  //     res.json({
  //       success: true,
  //       message: "User created successfully!",
  //       redirectUrl: "/users",
  //     });
  //   } catch (err) {
  //     console.error(err);
  //     req.flash("error", "Failed to fetch user data");
  //     res.redirect("/");
  //   }
  // },

  postCreateAuthUser: async (req, res) => {
    try {
      // Extract form data from the request body
      const { firstName, lastName, phoneNumber, email, password } = req.body;
      hash_password = await bcrypt.hash("clcpassword", saltRounds);
      // Create the user in the database
      const newUser = await UserData.create({
        firstName,
        lastName,
        phoneNumber,
        email,
        password: hash_password,
        emailVerificationTokenExpiresAt: new Date("2024-04-09"),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log("added successfully");
      // Assuming successful creation, send success flash message
      res.json({
        success: true,
        message: "User created successfully!",
        redirectUrl: "/auth/users",
      });
      // You can customize this redirection based on your application flo
    } catch (err) {
      console.error(err);
      req.flash("error", "Failed to create user");
      res.redirect("/auth/users"); // Adjust the redirection URL as needed
    }
  },

  updateAuthUser: async (req, res) => {
    try {
      const successMsg = req.flash("success")[0];
      const errorMsg = req.flash("error")[0];
      const currentUser = req.user;

      res.render("admin/pastors", {
        currentUser,
        successMsg,
        errorMsg,
        pageName: "User list",
      });
    } catch (err) {
      console.error(err);
      req.flash("error", "Failed to fetch user data");
      res.redirect("/");
    }
  },

  updateUser: async (req, res) => {
    try {
      const successMsg = req.flash("success")[0];
      const errorMsg = req.flash("error")[0];
      const currentUser = req.user;

      res.render("admin/pastors", {
        currentUser,
        successMsg,
        errorMsg,
        pageName: "User list",
      });
    } catch (err) {
      console.error(err);
      req.flash("error", "Failed to fetch user data");
      res.redirect("/");
    }
  },

  // Assuming you're using Express.js
  deleteUser: async (req, res) => {
    const { userId } = req.params;
    try {
      // Delete user from the database based on the userId
      await User.destroy({ where: { id: userId } });
      // Optionally, you can send a success message back to the client
      res.json({
        success: true,
        redirectUrl: "/users",
        message: "User deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to delete user" });
    }
  },

  deleteAuthUser: async (req, res) => {
    const { userId } = req.params;
    try {
      // Delete user from the database based on the userId
      await UserData.destroy({ where: { id: userId } });
      // Optionally, you can send a success message back to the client
      res.json({
        success: true,
        redirectUrl: "/auth/users",
        message: "User deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to delete user" });
    }
  },
};

module.exports = clcUser;
