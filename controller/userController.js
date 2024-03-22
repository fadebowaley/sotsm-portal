// controllers/userController.js
const bcrypt = require('bcrypt');

// Sample user data (replace with actual database queries)
const users = [];



      // res.render("pages/index", {
        // hotels,

const userController = {


 employeeData: async (req, res) => {
    const successMsg = req.flash("success")[0];
    const errorMsg = req.flash("error")[0];

    try {
      // Fetch all form data
      res.render("index", {
      });
    } catch (err) {
      console.error(err);
      res.redirect("/");
    }
  },



  registerUser: async (req, res) => {
    try {
      //get all userdata to fill user table
      // then create a password

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = { username: req.body.username, password: hashedPassword };
      users.push(user);
      res.json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ error: "Registration failed" });
    }
  },

  loginUser: async (req, res) => {
    const user = users.find((user) => user.username === req.body.username);
    if (user == null) {
      return res.status(400).json({ error: "User not found" });
    }
    try {
      if (await bcrypt.compare(req.body.password, user.password)) {
        req.session.user = user;
        res.json({ message: "Login successful" });
      } else {
        res.status(401).json({ error: "Invalid password" });
      }
    } catch {
      res.status(500).json({ error: "Login failed" });
    }
  },

  logoutUser: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ error: "Logout failed" });
      } else {
        res.json({ message: "Logout successful" });
      }
    });
  },
};

module.exports = userController;
