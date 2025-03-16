const mongoose = require("mongoose");
const { conn } = require("../config/dbb");

const permissionSchema = new mongoose.Schema({
  route: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    enum: ["GET", "POST", "PUT", "DELETE"],
    required: true,
  },
  alias: {
    type: String,
    required: true,
  },
  remark: {
    type: String,
    required: true,
  },
  roles: { type: mongoose.Schema.Types.ObjectId, ref: "Role" }, 
});

// Create a compound index on route and method
permissionSchema.index({ route: 1, method: 1 }, { unique: true });

module.exports = conn.model("Permission", permissionSchema);
