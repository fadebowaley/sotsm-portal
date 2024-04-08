const { UserData } = require("../models");

const indexController = {
  getHomePage: async (req, res) => {
     const successMsg = req.flash("success")[0];
     const errorMsg = req.flash("error")[0];
     const currentUser = req.user
    try {

       //const users = await UserData.findAll();
      //const users = await User.find({}).populate("church");
      //console.log(users);
      res.render("pages/index", {
        errorMsg,
        successMsg,
        currentUser
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },

  getContactPage: async (req, res) => {
    try {
      //code here
      req.i18n.changeLanguage(req.session.lang);
      res.render("pages/contactUs", {
        lang: res.locals.lang,
      });
    } catch (err) {
      console.log(err.message);
      res.redirect("/");
    }
  },
};

module.exports = indexController;
