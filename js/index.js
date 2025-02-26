document.addEventListener("DOMContentLoaded", function () {
  const passengerSelect = document.querySelector(".passenger-select");
  const inputField = passengerSelect.querySelector(".input-field");
  const dropdown = passengerSelect.querySelector(".passenger-dropdown");

  // Toggle dropdown when clicking on the input field
  inputField.addEventListener("click", function (e) {
    e.stopPropagation();
    dropdown.classList.toggle("hidden");
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", function (e) {
    if (!passengerSelect.contains(e.target)) {
      dropdown.classList.add("hidden");
    }
  });

  // Prevent dropdown from closing when clicking inside it
  dropdown.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  // Close dropdown when clicking OK button
  const okButton = dropdown.querySelector(".ok-button");
  okButton.addEventListener("click", function () {
    dropdown.classList.add("hidden");
  });
});
