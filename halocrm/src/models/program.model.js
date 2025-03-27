const mongoose = require('mongoose');
const validator = require('validator'); // Validator is used for validating input data, such as checking if a string is a valid email format.
const { toJSON, paginate } = require('./plugins'); // toJSON plugin is used to convert Mongoose documents to JSON format, while paginate helps in paginating results.

const programSchema = mongoose.Schema({
  tenantId: {
    type: String,
    index: true,
  },
  //write a profile  cqtegorizing into education,
  //  personal profile, ministry resume,
});

// add plugin that converts mongoose to json
programSchema.plugin(toJSON);
programSchema.plugin(paginate);

/**
 * @typedef Program
 */

const Program = mongoose.model('Program', programSchema);
module.exports = Program;
