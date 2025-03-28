const mongoose = require('mongoose');
const validator = require('validator'); // Validator is used for validating input data, such as checking if a string is a valid email format.
const { toJSON, paginate } = require('./plugins'); // toJSON plugin is used to convert Mongoose documents to JSON format, while paginate helps in paginating results.

const statementSchema = mongoose.Schema({
  tenantId: {
    type: String,
    index: true,
  },
  //  personal profile, ministry resume,
});

// add plugin that converts mongoose to json
statementSchema.plugin(toJSON);
statementSchema.plugin(paginate);

/**
 * @typedef Statement
 */
const Statement = mongoose.model('Statement', statementSchema);
module.exports = Statement;
