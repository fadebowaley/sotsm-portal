const { Church } = require("../models");
const { UserData } = require("../models");
const { Sequelize } = require("sequelize");
const {parishCode } = require("../middleware/utils");

const clcChurch = {
  getParishes: async (req, res) => {
    try {
      // Extract page and limit from query parameters, default to 1 and 10 respectively
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 100;

      // Calculate offset based on page and limit
      const offset = (page - 1) * limit;

      // Retrieve users from the database with pagination
      const { rows: churches, count } = await Church.findAndCountAll({
        offset,
        limit,
        where: {
          [Sequelize.Op.and]: [
            Sequelize.where(
              Sequelize.fn("LEFT", Sequelize.col("parishCode"), 2),
              "=",
              "PR"
            ),
          ],
        },
        order: [
          ["nationalCode", "ASC"],
          ["divisionCode", "ASC"],
          ["dioceseCode", "ASC"],
          ["zonalCode", "ASC"],
          ["parishCode", "ASC"],
        ],
      });

      // Calculate total pages based on total count and limit
      const totalPages = Math.ceil(count / limit);
      // Render the view with the list of users and pagination info
      res.render("admin/church", {
        churches,
        totalPages,
        currentUser: req.user,
        currentPage: page,
        successMsg: req.flash("success")[0],
        errorMsg: req.flash("error")[0],
        pageName: "All Parishes",
      });
    } catch (err) {
      console.error(err);
      req.flash("error", "Failed to fetch user data");
      res.redirect("/");
    }
  },

  getZones: async (req, res) => {
    try {
      // Extract page and limit from query parameters, default to 1 and 10 respectively
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 25;

      // Calculate offset based on page and limit
      const offset = (page - 1) * limit;
      const { rows: churches, count } = await Church.findAndCountAll({
        offset,
        limit,
        order: [["zonalCode", "ASC"]],
        where: {
          [Sequelize.Op.and]: [
            Sequelize.where(
              Sequelize.fn("SUBSTRING", Sequelize.col("parishCode"), 3),
              "=",
              Sequelize.fn("SUBSTRING", Sequelize.col("zonalCode"), 3)
            ),
         
          ],
        },
      });

      // Calculate total pages based on total count and limit
      const totalPages = Math.ceil(count / limit);
      // Render the view with the list of users and pagination info
      res.render("admin/church/zone", {
        churches,
        totalPages,
        currentUser: req.user,
        currentPage: page,
        successMsg: req.flash("success")[0],
        errorMsg: req.flash("error")[0],
        pageName: "All zones",
      });
    } catch (err) {
      console.error(err);
      req.flash("error", "Failed to fetch user data");
      res.redirect("/");
    }
  },

  getDiocese: async (req, res) => {
    try {
      // Extract page and limit from query parameters, default to 1 and 10 respectively
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 25;

      // Calculate offset based on page and limit
      const offset = (page - 1) * limit;
      const { rows: churches, count } = await Church.findAndCountAll({
        offset,
        limit,
        order: [["dioceseCode", "ASC"]],
        where: {
          [Sequelize.Op.and]: [
            Sequelize.where(
              Sequelize.fn("SUBSTRING", Sequelize.col("parishCode"), 3),
              "=",
              Sequelize.fn("SUBSTRING", Sequelize.col("zonalCode"), 3)
            ),
            Sequelize.where(
              Sequelize.fn("SUBSTRING", Sequelize.col("parishCode"), 3),
              "=",
              Sequelize.fn("SUBSTRING", Sequelize.col("dioceseCode"), 3)
            ),
          
          ],
        },
      });

      // Calculate total pages based on total count and limit
      const totalPages = Math.ceil(count / limit);
      // Render the view with the list of users and pagination info
      res.render("admin/church/diocese", {
        churches,
        totalPages,
        currentUser: req.user,
        currentPage: page,
        successMsg: req.flash("success")[0],
        errorMsg: req.flash("error")[0],
        pageName: "All Diocese",
      });
    } catch (err) {
      console.error(err);
      req.flash("error", "Failed to fetch user data");
      res.redirect("/");
    }
  },

  getDivision: async (req, res) => {
    try {
      // Extract page and limit from query parameters, default to 1 and 10 respectively
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 25;

      // Calculate offset based on page and limit
      const offset = (page - 1) * limit;
      const { rows: churches, count } = await Church.findAndCountAll({
        offset,
        limit,
        order: [["divisionCode", "ASC"]],
        where: {
          [Sequelize.Op.and]: [
            Sequelize.where(
              Sequelize.fn("SUBSTRING", Sequelize.col("parishCode"), 3),
              "=",
              Sequelize.fn("SUBSTRING", Sequelize.col("zonalCode"), 3)
            ),
            Sequelize.where(
              Sequelize.fn("SUBSTRING", Sequelize.col("parishCode"), 3),
              "=",
              Sequelize.fn("SUBSTRING", Sequelize.col("dioceseCode"), 3)
            ),
            Sequelize.where(
              Sequelize.fn("SUBSTRING", Sequelize.col("parishCode"), 3),
              "=",
              Sequelize.fn("SUBSTRING", Sequelize.col("divisionCode"), 3)
            ),
            { hqStatus: "division" },
          ],
        },
      });

      // Calculate total pages based on total count and limit
      const totalPages = Math.ceil(count / limit);
      // Render the view with the list of users and pagination info
      res.render("admin/church/division", {
        churches,
        totalPages,
        currentUser: req.user,
        currentPage: page,
        successMsg: req.flash("success")[0],
        errorMsg: req.flash("error")[0],
        pageName: "All Diocese",
      });
    } catch (err) {
      console.error(err);
      req.flash("error", "Failed to fetch user data");
      res.redirect("/");
    }
  },

  getMission: async (req, res) => {
    try {
      // Extract page and limit from query parameters, default to 1 and 10 respectively
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 25;
      // Calculate offset based on page and limit
      const offset = (page - 1) * limit;
      const { rows: churches, count } = await Church.findAndCountAll({
        offset,
        limit,
        order: [["parishCode", "ASC"]],
        where: {
          [Sequelize.Op.and]: [
            Sequelize.where(
              Sequelize.fn("LEFT", Sequelize.col("parishCode"), 2),
              "=",
              "NM"
            ),
          ],
        },
      });

      // Calculate total pages based on total count and limit
      const totalPages = Math.ceil(count / limit);
      // Render the view with the list of users and pagination info
      res.render("admin/church/mission", {
        churches,
        totalPages,
        currentUser: req.user,
        currentPage: page,
        successMsg: req.flash("success")[0],
        errorMsg: req.flash("error")[0],
        pageName: "All Diocese",
      });
    } catch (err) {
      console.error(err);
      req.flash("error", "Failed to fetch user data");
      res.redirect("/");
    }
  },

  // Controller function to handle fetching church data by ID
getChurchDataById:  async (req, res) => {
  try {
    const churchId = req.query.id; 

 const zones = await Church.findAll({
   attributes: ["zonalCode"],
   group: ["zonalCode"],
   order: [["zonalCode", "ASC"]],
 });
  

 const dioceses= await Church.findAll({
   attributes: ["dioceseCode"],
   group: ["dioceseCode"],
   order: [["dioceseCode", "ASC"]],
 });


  const divisions = await Church.findAll({
    attributes: ["divisionCode"],
    group: ["divisionCode"],
    order: [["divisionCode", "ASC"]],
  });



    const church = await Church.findByPk(churchId);


    res.json({church, zones, dioceses, divisions});

  } catch (error) {
    // Handle any errors
    console.error('Error fetching church data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
},


updateOrCreateChurch: async (req, res) => {
    try {
      // Extract churchId from request parameters
      const churchId = req.params.churchId;

      // Extract form data from request body
       const { parishName, zonalCode, newZonalCode, dioceseCode, newDioceseCode, divisionCode, newDivisionCode, hqStatus } = req.body;
        console.log(req.body);

       if (churchId) {
        // Update operation
        const church = await Church.findByPk(churchId);

        if (!church) {
          return res.status(404).json({ success: false, message: 'Church not found' });
        }

        // Update church data
        church.parishName = parishName;
        church.zonalCode = newZonalCode || zonalCode; // If newZonalCode is provided, use it; otherwise, use the existing zonalCode
        church.dioceseCode = newDioceseCode || dioceseCode; // If newDioceseCode is provided, use it; otherwise, use the existing dioceseCode
        church.divisionCode = newDivisionCode || divisionCode; // If newDivisionCode is provided, use it; otherwise, use the existing divisionCode
        church.hqStatus = hqStatus;
        // Save the updated church data
        await church.save();

        res.json({ success: true, message: 'Church updated successfully' });
      } else {
        // Create operation
        const newChurch = await Church.create({
          parishName,
          zonalCode: newZonalCode || zonalCode,
          dioceseCode: newDioceseCode || dioceseCode,
          divisionCode: newDivisionCode || divisionCode
          // Add other properties as needed
        });

        res.json({ success: true, message: 'Church created successfully', church: newChurch });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
};



module.exports = clcChurch;
