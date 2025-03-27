const mongoose = require('mongoose');
const validator = require('validator'); // Validator is used for validating input data, such as checking if a string is a valid email format.
const { toJSON, paginate } = require('./plugins'); // toJSON plugin is used to convert Mongoose documents to JSON format, while paginate helps in paginating results.

const settingsSchema = mongoose.Schema({
  tenantId: {
    type: String,
    index: true,
  },
  //write a profile  cqtegorizing into education,
  //  personal profile, ministry resume,
});

// add plugin that converts mongoose to json
settingsSchema.plugin(toJSON);
settingsSchema.plugin(paginate);

/**
 * @typedef Settings
 */
const Settings = mongoose.model('Settings', settingsSchema);
module.exports = Settings;
