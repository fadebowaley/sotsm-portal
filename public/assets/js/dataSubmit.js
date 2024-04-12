"strict"

// Get form elements for personal Information
const title = document.getElementById("title").value;
const firstname = document.getElementById("firstname").value;
const lastname = document.getElementById("lastname").value;
const otherName = document.getElementById("otherName").value;
const email = document.getElementById("email").value;
const phone = document.getElementById("phone").value;
const genderMale = document.getElementById("male").checked;
const genderFemale = document.getElementById("female").checked;
const dateOfBirth = document.getElementById("dateOfBirth").value;
const highestQualification = document.getElementById(
  "highestQualification"
).value;
const professionalQualification = document.getElementById(
  "professionalQualification"
).value;
const maritalStatus = document.getElementById("maritalStatus").value;
const stateOfOrigin = document.getElementById("stateSelect4").value;
const lgaOfOrigin = document.getElementById("lgaSelect4").value;
const homeTown = document.getElementById("homeTown").value;
const spouseName = document.getElementById("spouseName").value;
const spousePhoneNumber = document.getElementById("spousePhoneNumber").value;
const spouseDateOfBirth = document.getElementById("spouseDateOfBirth").value;
const nextOfKinName = document.getElementById("nextOfKinName").value;
const nextOfKinPhoneNumber = document.getElementById(
  "nextOfKinPhoneNumber"
).value;
const nextOfKinRelationship = document.getElementById(
  "nextOfKinRelationship"
).value;
const residentialAddress = document.getElementById("residentialAddress").value;
const stateOfResidence = document.getElementById("stateSelect1").value;
const lgaOfResidence = document.getElementById("lgaSelect1").value;
const employmentCategory = document.getElementById("emp-category").value;
const occupation = document.getElementById("occupation").value;




// Get all elements for the second form
const yearBornAgain = document.getElementById('yearBornAgain').value;
const waterBaptized = document.getElementById('waterBaptized').value;
const holyghostBaptism = document.getElementById('holyghostBaptism').value;
const joinedSotsm = document.getElementById('joinedSotsm').value;
const becameWorker = document.getElementById('becameWorker').value;
const becameMinister = document.getElementById('becameMinister').value;
const ordainedDcns = document.getElementById('ordainedDcns').value;
const becamePastor = document.getElementById('becamePastor').value;
const becameSnrPastor = document.getElementById('becameSnrPastor').value;
const ordainedElder = document.getElementById('ordainedElder').value;
const ordainedBishop = document.getElementById('ordainedBishop').value;
const lastOrdinationDate = document.getElementById('lastOrdinationDate').value;
const IBSCOMS = document.getElementById('IBSCOMS').value;
const WOOCOME = document.getElementById('WOOCOME').value;
const ILS = document.getElementById('ILS').value;
const NGBTI = document.getElementById('NGBTI').value;
const placeOfAssignment = document.getElementById('placeOfAssignment').value;
const nameOfzone = document.getElementById('nameOfzone').value;
const nameOfDiocese = document.getElementById('nameOfDiocese').value;
const nameOfDivision = document.getElementById('nameOfDivision').value;
const stateSelect2 = document.getElementById('stateSelect2').value;
const lgaSelect2 = document.getElementById('lgaSelect2').value;
const placeOfAssignmentAddress = document.getElementById('placeOfAssignmentAddress').value;
const countryChurch = document.getElementById('countryChurch').value;
const jobTitle = document.getElementById('jobTitle').value;
const yrEmployed = document.getElementById('yrEmployed').value;
const unitInDepartment = document.getElementById('unitInDepartment').value;
const gradeLevel = document.getElementById('gradeLevel').value;
const stepLevel = document.getElementById('stepLevel').value;
const deptAdress = document.getElementById('deptAdress').value;
const stateSelect3 = document.getElementById('stateSelect3').value;
const lgaSelect3 = document.getElementById('lgaSelect3').value;
const countryOrg = document.getElementById('countryOrg').value;
const ispastor_parish = document.getElementById('ispastor_parish').value;
const careerPastorOffice = document.getElementById('careerPastorOffice').value;

// Now you have all the values of the elements for the second form
const dateEstablished = document.getElementById('dateEstablished').value;
const churchProperty = document.getElementById('churchProperty').value;
const propertyEstimatedValue = document.getElementById('propertyEstimatedValue').value;
const clcBuilding = document.getElementById('clcBuilding').value;
const leaseType = document.getElementById('leaseType').value;
const avgadult = document.getElementById('avgadult').value;
const avgyouth = document.getElementById('avgyouth').value;
const avgchildren = document.getElementById('avgchildren').value;
const total = document.getElementById('total').value;
const totalWorkers = document.getElementById('totalWorkers').value;
const workersInTraining = document.getElementById('workersInTraining').value;
const unordainedLeaders = document.getElementById('unordainedLeaders').value;
const noofMinisters = document.getElementById('noofMinisters').value;
const noofdcns = document.getElementById('noofdcns').value;
const noofpastor = document.getElementById('noofpastor').value;
const noofsnrpastor = document.getElementById('noofsnrpastor').value;
const noofelder = document.getElementById('noofelder').value;
const noofbishops = document.getElementById('noofbishops').value;

// Now you have all the values of the elements for the third form


/*
//validate Personal Data 100% filled
function validatePersonalData() {
  // Initialize an array to store the names of empty fields
  let emptyFields = [];

  // Get values of all elements
  const title = document.getElementById("title").value;
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const otherName = document.getElementById("otherName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const genderMale = document.getElementById("male").checked;
  const genderFemale = document.getElementById("female").checked;
  const dateOfBirth = document.getElementById("dateOfBirth").value;
  const highestQualification = document.getElementById(
    "highestQualification"
  ).value;
  const professionalQualification = document.getElementById(
    "professionalQualification"
  ).value;
  const maritalStatus = document.getElementById("maritalStatus").value;
  const stateOfOrigin = document.getElementById("stateSelect4").value;
  const lgaOfOrigin = document.getElementById("lgaSelect4").value;
  const homeTown = document.getElementById("homeTown").value;
  const spouseName = document.getElementById("spouseName").value;
  const spousePhoneNumber = document.getElementById("spousePhoneNumber").value;
  const spouseDateOfBirth = document.getElementById("spouseDateOfBirth").value;
  const nextOfKinName = document.getElementById("nextOfKinName").value;
  const nextOfKinPhoneNumber = document.getElementById(
    "nextOfKinPhoneNumber"
  ).value;
  const nextOfKinRelationship = document.getElementById(
    "nextOfKinRelationship"
  ).value;
  const residentialAddress =
    document.getElementById("residentialAddress").value;
  const stateOfResidence = document.getElementById("stateSelect1").value;
  const lgaOfResidence = document.getElementById("lgaSelect1").value;
  const employmentCategory = document.getElementById("emp-category").value;
  const occupation = document.getElementById("occupation").value;

  // Check if each required field is empty and add its name to the array if it is
  if (title.trim() === "") {
    emptyFields.push("Title");
  }
  if (firstname.trim() === "") {
    emptyFields.push("First Name");
  }
  if (lastname.trim() === "") {
    emptyFields.push("Last Name");
  }
  if (otherName.trim() === "") {
    emptyFields.push("Other Name");
  }
  if (email.trim() === "") {
    emptyFields.push("Email");
  }
  if (phone.trim() === "") {
    emptyFields.push("Phone");
  }
  if (!genderMale && !genderFemale) {
    emptyFields.push("Gender");
  }
  if (dateOfBirth.trim() === "") {
    emptyFields.push("Date of Birth");
  }
  if (highestQualification.trim() === "") {
    emptyFields.push("Highest Qualification");
  }
  if (professionalQualification.trim() === "") {
    emptyFields.push("Professional Qualification");
  }
  if (maritalStatus.trim() === "") {
    emptyFields.push("Marital Status");
  }
  if (stateOfOrigin.trim() === "") {
    emptyFields.push("State of Origin");
  }
  if (lgaOfOrigin.trim() === "") {
    emptyFields.push("LGA of Origin");
  }
  if (homeTown.trim() === "") {
    emptyFields.push("Home Town");
  }
  if (spouseName.trim() === "") {
    emptyFields.push("Spouse Name");
  }
  if (spousePhoneNumber.trim() === "") {
    emptyFields.push("Spouse Phone Number");
  }
  if (spouseDateOfBirth.trim() === "") {
    emptyFields.push("Spouse Date of Birth");
  }
  if (nextOfKinName.trim() === "") {
    emptyFields.push("Next of Kin Name");
  }
  if (nextOfKinPhoneNumber.trim() === "") {
    emptyFields.push("Next of Kin Phone Number");
  }
  if (nextOfKinRelationship.trim() === "") {
    emptyFields.push("Next of Kin Relationship");
  }
  if (residentialAddress.trim() === "") {
    emptyFields.push("Residential Address");
  }
  if (stateOfResidence.trim() === "") {
    emptyFields.push("State of Residence");
  }
  if (lgaOfResidence.trim() === "") {
    emptyFields.push("LGA of Residence");
  }
  if (employmentCategory.trim() === "") {
    emptyFields.push("Employment Category");
  }
  if (occupation.trim() === "") {
    emptyFields.push("Occupation");
  }

  // If there are empty fields, display an alert message
  if (emptyFields.length > 0) {
    let errorMessage = "Please fill in the following fields:\n";
    errorMessage += emptyFields.join("\n");
    alert(errorMessage);
  }
  // Return the array of empty fields (useful for further processing if needed)
  return emptyFields;
}
*/

// Function to validate the form and return an array of empty fields
function validateForm() {
  const emptyFields = [];

  const title = document.getElementById("title").value;
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const otherName = document.getElementById("otherName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const genderMale = document.getElementById("male").checked;
  const genderFemale = document.getElementById("female").checked;
  const dateOfBirth = document.getElementById("dateOfBirth").value;
  const highestQualification = document.getElementById("highestQualification").value;
  const professionalQualification = document.getElementById("professionalQualification").value;
  const maritalStatus = document.getElementById("maritalStatus").value;
  const stateOfOrigin = document.getElementById("stateSelect4").value;
  const lgaOfOrigin = document.getElementById("lgaSelect4").value;
  const homeTown = document.getElementById("homeTown").value;
  const spouseName = document.getElementById("spouseName").value;
  const spousePhoneNumber = document.getElementById("spousePhoneNumber").value;
  const spouseDateOfBirth = document.getElementById("spouseDateOfBirth").value;
  const nextOfKinName = document.getElementById("nextOfKinName").value;
  const nextOfKinPhoneNumber = document.getElementById("nextOfKinPhoneNumber").value;
  const nextOfKinRelationship = document.getElementById("nextOfKinRelationship").value;
  const residentialAddress = document.getElementById("residentialAddress").value;
  const stateOfResidence = document.getElementById("stateSelect1").value;
  const lgaOfResidence = document.getElementById("lgaSelect1").value;
  const employmentCategory = document.getElementById("emp-category").value;
  const occupation = document.getElementById("occupation").value;

  if (title.trim() === "") {
    emptyFields.push("Title");
  }
  if (firstname.trim() === "") {
    emptyFields.push("First Name");
  }
  if (lastname.trim() === "") {
    emptyFields.push("Last Name");
  }
  if (otherName.trim() === "") {
    emptyFields.push("Other Name");
  }
  if (email.trim() === "") {
    emptyFields.push("Email");
  }
  if (phone.trim() === "") {
    emptyFields.push("Phone");
  }
  if (!genderMale && !genderFemale) {
    emptyFields.push("Gender");
  }
  if (dateOfBirth.trim() === "") {
    emptyFields.push("Date of Birth");
  }
  if (highestQualification.trim() === "") {
    emptyFields.push("Highest Qualification");
  }
  if (professionalQualification.trim() === "") {
    emptyFields.push("Professional Qualification");
  }
  if (maritalStatus.trim() === "") {
    emptyFields.push("Marital Status");
  }
  if (stateOfOrigin.trim() === "") {
    emptyFields.push("State of Origin");
  }
  if (lgaOfOrigin.trim() === "") {
    emptyFields.push("LGA of Origin");
  }
  if (homeTown.trim() === "") {
    emptyFields.push("Home Town");
  }
  if (spouseName.trim() === "") {
    emptyFields.push("Spouse Name");
  }
  if (spousePhoneNumber.trim() === "") {
    emptyFields.push("Spouse Phone Number");
  }
  if (spouseDateOfBirth.trim() === "") {
    emptyFields.push("Spouse Date of Birth");
  }
  if (nextOfKinName.trim() === "") {
    emptyFields.push("Next of Kin Name");
  }
  if (nextOfKinPhoneNumber.trim() === "") {
    emptyFields.push("Next of Kin Phone Number");
  }
  if (nextOfKinRelationship.trim() === "") {
    emptyFields.push("Next of Kin Relationship");
  }
  if (residentialAddress.trim() === "") {
    emptyFields.push("Residential Address");
  }
  if (stateOfResidence.trim() === "") {
    emptyFields.push("State of Residence");
  }
  if (lgaOfResidence.trim() === "") {
    emptyFields.push("LGA of Residence");
  }
  if (employmentCategory.trim() === "") {
    emptyFields.push("Employment Category");
  }
  if (occupation.trim() === "") {
    emptyFields.push("Occupation");
  }

  if (emptyFields.length > 0) {
    // If there are empty fields, alert and return false
    alert("The following fields are required:\n" + emptyFields.join("\n"));
    return false;
  } else {
    // If no empty fields, return true
    return true;
  }
}

// Function to create the pastorData object
function createPastorData() {
  const pastorData = {};
  // Add data to pastorData object if the field is not empty
  function addToPastorData(fieldId, fieldName) {
    const fieldValue = document.getElementById(fieldId).value.trim();
    if (fieldValue !== "") {
      pastorData[fieldName] = fieldValue;
    }
  }

  addToPastorData("title", "Title");
  addToPastorData("firstname", "First Name");
  addToPastorData("lastname", "Last Name");
  addToPastorData("otherName", "Other Name");
  addToPastorData("email", "Email");
  addToPastorData("phone", "Phone");
  addToPastorData("dateOfBirth", "Date of Birth");
  addToPastorData("highestQualification", "Highest Qualification");
  addToPastorData("professionalQualification", "Professional Qualification");
  addToPastorData("maritalStatus", "Marital Status");
  addToPastorData("stateSelect4", "State of Origin");
  addToPastorData("lgaSelect4", "LGA of Origin");
  addToPastorData("homeTown", "Home Town");
  addToPastorData("spouseName", "Spouse Name");
  addToPastorData("spousePhoneNumber", "Spouse Phone Number");
  addToPastorData("spouseDateOfBirth", "Spouse Date of Birth");
  addToPastorData("nextOfKinName", "Next of Kin Name");
  addToPastorData("nextOfKinPhoneNumber", "Next of Kin Phone Number");
  addToPastorData("nextOfKinRelationship", "Next of Kin Relationship");
  addToPastorData("residentialAddress", "Residential Address");
  addToPastorData("stateSelect1", "State of Residence");
  addToPastorData("lgaSelect1", "LGA of Residence");
  addToPastorData("emp-category", "Employment Category");
  addToPastorData("occupation", "Occupation");

  return pastorData;
}


/**

<!DOCTYPE html>
<html>
<head>
  <title>Persist Form Data with LocalStorage</title>
</head>
<body>
  <form id="myForm">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name">

    <label for="email">Email:</label>
    <input type="email" id="email" name="email">

    <label for="message">Message:</label>
    <textarea id="message" name="message"></textarea>

    <button type="submit">Submit</button>
  </form>

  <script>
    // Get the form element
    const form = document.getElementById('myForm');

    // Function to save form data to localStorage
    function saveFormData() {
      const formData = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value
      };
      localStorage.setItem('formData', JSON.stringify(formData));
    }

    // Function to populate form fields from localStorage
    function populateFormFromStorage() {
      const formData = JSON.parse(localStorage.getItem('formData'));
      if (formData) {
        form.name.value = formData.name;
        form.email.value = formData.email;
        form.message.value = formData.message;
      }
    }

    // Attach event listeners to form fields to save data on change
    form.addEventListener('input', saveFormData);

    // Populate the form when the page loads
    window.addEventListener('load', populateFormFromStorage);
  </script>
</body>
</html>


// Save form data to localStorage
function saveFormData() {
  const formData = {};
  const formFields = document.querySelectorAll('input, textarea, select');
  formFields.forEach(field => {
    formData[field.name] = field.value;
  });
  localStorage.setItem('formData', JSON.stringify(formData));
}

// Retrieve form data from localStorage and populate the form
function populateFormFromStorage() {
  const formData = JSON.parse(localStorage.getItem('formData'));
  if (formData) {
    const formFields = document.querySelectorAll('input, textarea, select');
    formFields.forEach(field => {
      if (formData[field.name]) {
        field.value = formData[field.name];
      }
    });
  }
}

// Attach event listeners to form fields to save data on change
const formFields = document.querySelectorAll('input, textarea, select');
formFields.forEach(field => {
  field.addEventListener('input', saveFormData);
});

// Populate the form when the page loads
window.addEventListener('load', populateFormFromStorage);
**/
