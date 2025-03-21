const inboxController = {
    getMesssages: async (req, res) => {
      try {
        res.render("apps/inbox/listing", {});
      } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
      }
    },
  
    getCompose: async (req, res) => {
      try {
        res.render("apps/inbox/compose", {});
      } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
      }
    },
  
    getReply: async (req, res) => {
      try {
        res.render("apps/inbox/reply", {});
      } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
      }
    },
  
  };
  
  module.exports = inboxController;
  