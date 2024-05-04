// Validation function for employment church data
function validateEmploymentChurchData(reqBody) {
  const errors = [];

  // Validate stateChurchc field
  if (!reqBody.stateChurchc || reqBody.stateChurchc.trim() === "") {
    errors.push("State of church is required.");
  }

  // Validate lgaChurchc field
  if (!reqBody.lgaChurchc || reqBody.lgaChurchc.trim() === "") {
    errors.push("LGA of church is required.");
  }

  // Validate churchAdressc field
  if (!reqBody.churchAdressc || reqBody.churchAdressc.trim() === "") {
    errors.push("Church address is required.");
  }

  // Validate countryChurchc field
  if (!reqBody.countryChurchc || reqBody.countryChurchc.trim() === "") {
    errors.push("Country of church is required.");
  }

  // Validate dateEstablished field
  if (!reqBody.dateEstablished || reqBody.dateEstablished.trim() === "") {
    errors.push("Date of establishment is required.");
  }

  // Validate careerPastoroffice field
  if (!reqBody.careerPastoroffice || reqBody.careerPastoroffice.trim() === "") {
    errors.push("Pastor office is required.");
  }

  return errors;
}

module.exports = { validateEmploymentChurchData: validateEmploymentChurchData };
