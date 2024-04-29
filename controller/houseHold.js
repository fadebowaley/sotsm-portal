const { UserData } = require("../models");
const { Household } = require("../models");

/****
levelRank: An integer representing the level rank of the household. i.e 1 - 10 select html 
labelName: A string representing the label name of the household. i.e any input field html
status: A string representing the status i.e mainfold, Special version select html value 1, and 2

code: A string representing the code of the household. i.e 1st+3rd character of the labelName
statusCode: A string representing the status code i.e 1-mainfold, 2 for special version
codeFormat: A string representing the code format of the household. i.e based on the 1st+3rd character + 0483+randomly generated 6 Digits
idFke: A string representing the foreign key identifier.OnetimeGenerated int: User.id + 2183
userId: An integer representing the foreign key referencing the id column of the User table. i.e req.user
 * 
 * 
 */


const houseHoldController = {
  // Method to create a new household
  create: async (req, res) => {
    try {
      // Extract data from request body
     // const { levelRank, labelName, status,  } = req.body;
        console.log(req.body);

        
    //  // Generate code based on labelName
    //   const code = labelName.charAt(0) + labelName.charAt(2);

    //   // Generate codeFormat
    //   const codeFormat =
    //     code + "0483" + Math.floor(100000 + Math.random() * 900000);

    //   // Generate idFke
    //   const idFke = userId + 2183;

    //   // Create household record in database
    //   const newHouseHold = await houseHold.create({
    //     levelRank,
    //     labelName,
    //     code,
    //     status,
    //     codeFormat,
    //     idFke,
    //     userId,
    //   });

      // Send success response
      res
        .status(201)
        .json({
          message: "Household created successfully",
          data: "newHouseHold",
        });
    } catch (error) {
      // Handle error
      console.error("Error creating household:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },


  // Method to retrieve all households
  getAll: async (req, res) => {
    try {
           const page = parseInt(req.query.page) || 1;
           const limit = parseInt(req.query.limit) || 10;

           // Calculate offset based on page and limit
           const offset = (page - 1) * limit;

           // Retrieve users from the database with pagination
           const { rows: households, count } = await Household.findAndCountAll({
             offset,
             limit,
             order: [["createdAt", "DESC"]], // Optional: Order users by createdAt date
           });

           // Calculate total pages based on total count and limit
           const totalPages = Math.ceil(count / limit);

         res.render("admin/household", {
           households,
           totalPages,
           currentUser: req.user,
           currentPage: page,
           successMsg: req.flash("success")[0],
           errorMsg: req.flash("error")[0],
           pageName: "Church Structure",
         });
    } catch (error) {
      // Handle error
      console.error("Error retrieving households:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Method to retrieve a single household by ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;

      // Retrieve household by ID from database
      const household = await houseHold.findByPk(id);

      if (!household) {
        return res.status(404).json({ error: "Household not found" });
      }

      // Send response with retrieved household
      res.status(200).json(household);
    } catch (error) {
      // Handle error
      console.error("Error retrieving household by ID:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Method to update a household by ID
  updateById: async (req, res) => {
    try {
      const { id } = req.params;

      // Update household in database
      const [updatedRows] = await houseHold.update(req.body, {
        where: { id },
      });

      if (updatedRows === 0) {
        return res.status(404).json({ error: "Household not found" });
      }

      // Send success response
      res.status(200).json({ message: "Household updated successfully" });
    } catch (error) {
      // Handle error
      console.error("Error updating household by ID:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Method to delete a household by ID
  deleteById: async (req, res) => {
    try {
      const { id } = req.params;

      // Delete household from database
      const deletedRows = await houseHold.destroy({
        where: { id },
      });

      if (deletedRows === 0) {
        return res.status(404).json({ error: "Household not found" });
      }

      // Send success response
      res.status(200).json({ message: "Household deleted successfully" });
    } catch (error) {
      // Handle error
      console.error("Error deleting household by ID:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = houseHoldController;


