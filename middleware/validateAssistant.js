function validateAssistantData(reqBody) {
  const errors = [];

  // Validate pastorOffice field
  if (!reqBody.pastorOffice || reqBody.pastorOffice.trim() === "") {
    errors.push("Pastor office is required.");
  }

  // Add more validation rules for other fields if needed

  return errors;
}


module.exports = { validateAssistantData: validateAssistantData };