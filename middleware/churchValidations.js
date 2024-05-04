// churchValidation.js

// Function to validate the church data
function validateChurchData(reqBody) {
  const errors = [];

  // Validate if assistant is false
  if (reqBody.assistant === false) {

    // Check if required fields are missing
    if (!reqBody.placeOfAssignment) {
      errors.push("Place of assignment is required.");
    }

    if (!reqBody.stateChurch) {
      errors.push("State church is required.");
    }

    if (!reqBody.lgaChurch) {
      errors.push("LGA church is required.");
    }

    if (!reqBody.placeOfAssignmentAddress) {
      errors.push("Place of assignment address is required.");
    }

    if (!reqBody.countryChurch) {
      errors.push("Country church is required.");
    }

    if (!reqBody.dateEstablished) {
      errors.push("Date established is required.");
    } else if (!isValidDate(reqBody.dateEstablished)) {
      errors.push(
        "Invalid date format for date established. Please use YYYY-MM-DD format."
      );
    }

    if (!reqBody.churchProperty) {
      errors.push("Church property status is required.");
    }

    if (
      reqBody.propertyEstimatedValue === undefined ||
      isNaN(reqBody.propertyEstimatedValue) ||
      reqBody.propertyEstimatedValue < 0
    ) {
      errors.push("Invalid value for property estimated value.");
    }

    // if (!reqBody.clcBuilding) {
    //   errors.push("CLC building information is required.");
    // }

    // if (!reqBody.leaseType) {
    //   errors.push("Lease type is required.");
    // }

    if (!reqBody.pastorOffice) {
      errors.push("Pastor office information is required.");
    }
  }

  return errors;
}

// Function to validate date format (YYYY-MM-DD)
function isValidDate(date) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(date);
}


module.exports = { validateChurchData: validateChurchData }
