function populateStates() {
  const stateSelects = document.querySelectorAll('[id^="stateSelect"]');
  stateSelects.forEach((stateSelect) => {
    Object.keys(lgaList).forEach((state) => {
      const option = document.createElement("option");
      option.value = state;
      option.textContent = state;
      stateSelect.appendChild(option);
    });
  });
}

function populateLGAs(lgaSelectId) {
  const stateSelect = document.getElementById(
    lgaSelectId.replace("lgaSelect", "stateSelect")
  );
  const lgaSelect = document.getElementById(lgaSelectId);
  const selectedState = stateSelect.value;

  // Clear previous options
  lgaSelect.innerHTML = "";

  // Populate LGAs based on selected state
  if (selectedState) {
    lgaList[selectedState].forEach((lga) => {
      const option = document.createElement("option");
      option.value = lga;
      option.textContent = lga;
      lgaSelect.appendChild(option);
    });
  } else {
    // If no state is selected, display default option
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Select LGA";
    lgaSelect.appendChild(option);
  }
}

// Call function to populate states when page loads
document.addEventListener("DOMContentLoaded", function () {
  populateStates();
});
