function isValidEmail(email) {
  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhoneNumber(phone) {
  // Regular expression for Nigerian phone number validation
  const phoneRegex = /^0[7-9]\d{9}$/;
  return phoneRegex.test(phone);
}

function isValidDate(date) {
  // Regular expression for date validation (YYYY-MM-DD format)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(date);
}

function validateUserFields(reqBody) {

  const errors = [];

  // Validate title
  if (!reqBody.title) {
    errors.push("Title is required.");
  }

  // Validate firstName
  if (!reqBody.firstname) {
    errors.push("First name is required.");
  }

  // Validate lastName
  if (!reqBody.lastname) {
    errors.push("Last name is required.");
  }

  // Validate email
  if (!reqBody.email) {
    errors.push("Email is required.");
  } else if (!isValidEmail(reqBody.email)) {
    errors.push("Email is invalid.");
  }


  // Validate phoneNumber
  if (!reqBody.phone) {
    errors.push("Phone number is required.");
  } else if (!isValidPhoneNumber(reqBody.phone)) {
    errors.push("Phone number is invalid.");
  }

  // Validate gender
  if (!reqBody.genderMale && !reqBody.genderFemale) {
    errors.push("Gender is required.");
  }

  // Validate dateOfBirth
  if (!reqBody.dateOfBirth) {
    errors.push("Date of birth is required.");
  } else if (!isValidDate(reqBody.dateOfBirth)) {
    errors.push("Date of birth is invalid.");
  }

  // Validate maritalStatus
  if (!reqBody.maritalStatus) {
    errors.push("Marital status is required.");
  }

  // Validate highestQualification
  if (!reqBody.highestQualification) {
    errors.push("Highest qualification is required.");
  }

  // Validate stateOfOrigin
  if (!reqBody.stateOfOrigin) {
    errors.push("State of origin is required.");
  }

  // Validate lgaOfOrigin
  if (!reqBody.lgaOfOrigin) {
    errors.push("LGA of origin is required.");
  }

  // Validate homeTown
  if (!reqBody.homeTown) {
    errors.push("Home town is required.");
  }

  // Validate residentialAddress
  if (!reqBody.residentialAddress) {
    errors.push("Residential address is required.");
  }

  // Validate stateOfResidence
  if (!reqBody.stateOfResidence) {
    errors.push("State of residence is required.");
  }

  // Validate lgaOfResidence
  if (!reqBody.lgaOfResidence) {
    errors.push("LGA of residence is required.");
  }

  // Validate employmentCategory
  if (!reqBody.employmentCategory) {
    errors.push("Employment category is required.");
  }

  // Validate occupation
  if (!reqBody.occupation) {
    errors.push("Occupation is required.");
  }

  return errors;
}



module.exports = {
  validateUserFields: validateUserFields,
};