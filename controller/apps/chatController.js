const chatController = {
  getPrivate: async (req, res) => {
    try {
      res.render("apps/chat/private", {});
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },

  getGroup: async (req, res) => {
    try {
      res.render("apps/chat/group", {});
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },

  getDrawer: async (req, res) => {
    try {
      res.render("apps/chat/drawer", {});
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },

};

module.exports = chatController;
