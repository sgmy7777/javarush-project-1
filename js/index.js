// document.addEventListener("DOMContentLoaded", function () {
//   // Get the passenger input field and dropdown
//   const passengerInput = document.querySelector(
//     ".passenger-select .input-field"
//   );
//   const passengerDropdown = document.querySelector(".passenger-dropdown");

//   // Toggle dropdown when clicking on the passenger input field
//   passengerInput.addEventListener("click", function (event) {
//     passengerDropdown.classList.toggle("hidden");
//     event.stopPropagation();
//   });

//   // Close dropdown when clicking outside
//   document.addEventListener("click", function (event) {
//     if (
//       !passengerDropdown.contains(event.target) &&
//       event.target !== passengerInput
//     ) {
//       passengerDropdown.classList.add("hidden");
//     }
//   });

//   // Handle passenger counter buttons
//   const counterButtons = document.querySelectorAll(".counter-btn");
//   counterButtons.forEach((button) => {
//     button.addEventListener("click", function () {
//       const input = this.parentNode.querySelector(".passenger-count");
//       const currentValue = parseInt(input.value);

//       if (this.classList.contains("plus")) {
//         const maxValue = parseInt(input.getAttribute("max"));
//         if (currentValue < maxValue) {
//           input.value = currentValue + 1;
//         }
//       } else if (this.classList.contains("minus")) {
//         const minValue = parseInt(input.getAttribute("min"));
//         if (currentValue > minValue) {
//           input.value = currentValue - 1;
//         }
//       }

//       updatePassengerDisplay();
//     });
//   });

//   // Handle OK button
//   const okButton = document.querySelector(".ok-button");
//   okButton.addEventListener("click", function () {
//     updatePassengerDisplay();
//     passengerDropdown.classList.add("hidden");
//   });

//   // Update passenger display based on selections
//   function updatePassengerDisplay() {
//     const adultCount = parseInt(
//       document.querySelector(".passenger-info:nth-child(1) .passenger-count")
//         .value
//     );
//     const childCount = parseInt(
//       document.querySelector(".passenger-info:nth-child(2) .passenger-count")
//         .value
//     );
//     const infantCount = parseInt(
//       document.querySelector(".passenger-info:nth-child(3) .passenger-count")
//         .value
//     );
//     const totalPassengers = adultCount + childCount + infantCount;

//     const selectedClass = document.querySelector(
//       'input[name="travel-class"]:checked'
//     ).value;
//     let classText;

//     switch (selectedClass) {
//       case "business":
//         classText = "бизнес";
//         break;
//       case "economy":
//         classText = "эконом";
//         break;
//       default:
//         classText = "любой";
//     }

//     const passengerText =
//       totalPassengers === 1
//         ? "пассажир"
//         : totalPassengers > 1 && totalPassengers < 5
//         ? "пассажира"
//         : "пассажиров";

//     passengerInput.value = `${totalPassengers} ${passengerText}, ${classText}`;
//   }
// });
