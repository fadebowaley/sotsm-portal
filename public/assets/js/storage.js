// Save form data to localStorage
function saveFormData() {
  const formData = {};
  const formFields = document.querySelectorAll("input, textarea, select");
  formFields.forEach((field) => {
    formData[field.name] = field.value;
  });
  localStorage.setItem("formData", JSON.stringify(formData));
}

// Retrieve form data from localStorage and populate the form
function populateFormFromStorage() {
  const formData = JSON.parse(localStorage.getItem("formData"));
  if (formData) {
    const formFields = document.querySelectorAll("input, textarea, select");
    formFields.forEach((field) => {
      if (formData[field.name]) {
        field.value = formData[field.name];
      }
    });
  }
}

// Attach event listeners to form fields to save data on change
const formFields = document.querySelectorAll("input, textarea, select");
formFields.forEach((field) => {
  field.addEventListener("input", saveFormData);
});

// Populate the form when the page loads
window.addEventListener("load", populateFormFromStorage);
