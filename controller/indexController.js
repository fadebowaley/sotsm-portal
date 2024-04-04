const User = require("../models/user");

const indexController = {
  getHomePage: async (req, res) => {
    try {
      //const users = User.find({});
      const users = await User.find({}).populate("church");

      console.log(users);
      res.render("pages/index", {});
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
