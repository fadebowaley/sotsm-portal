// Validation function for the professional data
function validateProfessionalData(reqBody) {
  const errors = [];

  // Validate nameOfDepartment field
  if (!reqBody.nameOfDepartment || reqBody.nameOfDepartment.trim() === "") {
    errors.push("Name of department is required.");
  }

  // Validate deptAdress field
  if (!reqBody.deptAdress || reqBody.deptAdress.trim() === "") {
    errors.push("Department address is required.");
  }

  // Validate stateOrg field
  if (!reqBody.stateOrg || reqBody.stateOrg.trim() === "") {
    errors.push("State of organization is required.");
  }

  // Validate lgaOrg field
  if (!reqBody.lgaOrg || reqBody.lgaOrg.trim() === "") {
    errors.push("LGA of organization is required.");
  }

  // Validate countryOrg field
  if (!reqBody.countryOrg || reqBody.countryOrg.trim() === "") {
    errors.push("Country of organization is required.");
  }

  // Validate yrEmployed field
  if (!reqBody.yrEmployed || isNaN(parseInt(reqBody.yrEmployed))) {
    errors.push("Year employed must be a valid number.");
  }

  // Validate gradeLevel field
  if (!reqBody.gradeLevel || isNaN(parseInt(reqBody.gradeLevel))) {
    errors.push("Grade level must be a valid number.");
  }

  // Validate stepLevel field
  if (!reqBody.stepLevel || isNaN(parseInt(reqBody.stepLevel))) {
    errors.push("Step level must be a valid number.");
  }

  // Validate jobTitle field
  if (!reqBody.jobTitle || reqBody.jobTitle.trim() === "") {
    errors.push("Job title is required.");
  }

  return errors;
}

module.exports = { validateProfessionalData: validateProfessionalData };