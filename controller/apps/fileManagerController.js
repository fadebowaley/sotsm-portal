const fileManagerController = {
  getBlank: async (req, res) => {
    try {
      res.render("apps/file-manager/blank.ejs", {});
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },

  getFolder: async (req, res) => {
    try {
      res.render("apps/file-manager/folders.ejs", {});
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },

  getFile: async (req, res) => {
    try {
      res.render("apps/file-manager/files.ejs", {});
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },

  getSettings: async (req, res) => {
    try {
      res.render("apps/file-manager/settings.ejs", {});
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },

};

module.exports = fileManagerController;
