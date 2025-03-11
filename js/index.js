//  выпадающий список пассажиров /////////
/////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
  // Get the passenger input field and dropdown
  const passengerInput = document.querySelector(
    ".passenger-select .input-field"
  );
  const passengerDropdown = document.querySelector(".passenger-dropdown");
  const MAX_PASSENGERS = 9; // Максимальное количество пассажиров

  // Toggle dropdown when clicking on the passenger input field
  passengerInput.addEventListener("click", function (event) {
    passengerDropdown.classList.toggle("hidden");
    event.stopPropagation();
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !passengerDropdown.contains(event.target) &&
      event.target !== passengerInput
    ) {
      passengerDropdown.classList.add("hidden");
    }
  });

  // Function to update the plus buttons based on total passenger count
  function updateButtonStates() {
    const adultCount = parseInt(
      document.querySelector(".passenger-info:nth-child(1) .passenger-count")
        .value
    );
    const childCount = parseInt(
      document.querySelector(".passenger-info:nth-child(2) .passenger-count")
        .value
    );
    const infantCount = parseInt(
      document.querySelector(".passenger-info:nth-child(3) .passenger-count")
        .value
    );

    const totalPassengers = adultCount + childCount + infantCount;

    // Get all plus buttons
    const plusButtons = document.querySelectorAll(".counter-btn.plus");

    // Disable/enable plus buttons based on total count
    plusButtons.forEach((button) => {
      const input = button.parentNode.querySelector(".passenger-count");
      const currentValue = parseInt(input.value);
      const maxValue = parseInt(input.getAttribute("max"));

      // Disable if adding one more would exceed MAX_PASSENGERS
      // or if current value is at max for this specific input
      if (totalPassengers >= MAX_PASSENGERS || currentValue >= maxValue) {
        button.disabled = true;
      } else {
        button.disabled = false;
      }
    });
  }

  // Handle passenger counter buttons
  const counterButtons = document.querySelectorAll(".counter-btn");
  counterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const input = this.parentNode.querySelector(".passenger-count");
      const currentValue = parseInt(input.value);

      if (this.classList.contains("plus")) {
        const maxValue = parseInt(input.getAttribute("max"));
        const adultCount = parseInt(
          document.querySelector(
            ".passenger-info:nth-child(1) .passenger-count"
          ).value
        );
        const childCount = parseInt(
          document.querySelector(
            ".passenger-info:nth-child(2) .passenger-count"
          ).value
        );
        const infantCount = parseInt(
          document.querySelector(
            ".passenger-info:nth-child(3) .passenger-count"
          ).value
        );

        const totalPassengers = adultCount + childCount + infantCount;

        // Check if adding one more will exceed the limit
        if (currentValue < maxValue && totalPassengers < MAX_PASSENGERS) {
          input.value = currentValue + 1;
        }
      } else if (this.classList.contains("minus")) {
        const minValue = parseInt(input.getAttribute("min"));
        if (currentValue > minValue) {
          input.value = currentValue - 1;
        }
      }

      updatePassengerDisplay();
      updateButtonStates();
    });
  });

  // Handle class selection
  const classRadios = document.querySelectorAll('input[name="travel-class"]');
  classRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      // Remove active class from all labels
      document.querySelectorAll(".castom").forEach((label) => {
        label.classList.remove("castom-active");
      });

      // Add active class to the selected label
      const selectedLabel = document.querySelector(`label[for="${this.id}"]`);
      selectedLabel.classList.add("castom-active");

      updatePassengerDisplay();
    });
  });

  // Handle OK button
  const okButton = document.querySelector(".ok-button");
  okButton.addEventListener("click", function () {
    updatePassengerDisplay();
    passengerDropdown.classList.add("hidden");
  });

  // Update passenger display based on selections
  function updatePassengerDisplay() {
    const adultCount = parseInt(
      document.querySelector(".passenger-info:nth-child(1) .passenger-count")
        .value
    );
    const childCount = parseInt(
      document.querySelector(".passenger-info:nth-child(2) .passenger-count")
        .value
    );
    const infantCount = parseInt(
      document.querySelector(".passenger-info:nth-child(3) .passenger-count")
        .value
    );
    const totalPassengers = adultCount + childCount + infantCount;

    const selectedClass = document.querySelector(
      'input[name="travel-class"]:checked'
    ).value;
    let classText;

    switch (selectedClass) {
      case "business":
        classText = "бизнес";
        break;
      case "economy":
        classText = "эконом";
        break;
      default:
        classText = "любой";
    }

    const passengerText =
      totalPassengers === 1
        ? "пассажир"
        : totalPassengers > 1 && totalPassengers < 5
        ? "пассажира"
        : "пассажиров";

    passengerInput.value = `${totalPassengers} ${passengerText}, ${classText}`;
  }

  // Initialize display and button states
  updatePassengerDisplay();
  updateButtonStates();
});

// блок откуда //////////////////
////////////////////////////////

const cityInput = document.getElementById("cityInput");
const cityDropdown = document.getElementById("cityDropdown");
const selectedCityName = document.querySelector(".city-name.first-sity");
const selectedCityCode = document.querySelector(".city-code.first-line");
const nearestAirportsContainer =
  cityDropdown.querySelector("h3:last-of-type").nextElementSibling;

// Для отладки
console.log("Elements found:");
console.log("cityInput:", cityInput);
console.log("cityDropdown:", cityDropdown);
console.log("selectedCityName:", selectedCityName);
console.log("selectedCityCode:", selectedCityCode);

// Cities data with names and airport codes
const cities = [
  { name: "Варшава", code: "WAW" },
  { name: "Краков", code: "KRK" },
  { name: "Гданьск", code: "GDN" },
  { name: "Вроцлав", code: "WRO" },
  { name: "Познань", code: "POZ" },
  { name: "Лодзь", code: "LCJ" },
  { name: "Катовице", code: "KTW" },
  { name: "Люблин", code: "LUZ" },
];

// Variable to store the default city
const defaultCity = cities[0];
let selectedCity = defaultCity;

// Function to show the dropdown
function showDropdown() {
  cityDropdown.style.display = "block";
}

// Function to hide the dropdown
function hideDropdown() {
  cityDropdown.style.display = "none";
}

// Function to update the selected city display
function updateSelectedCity(city) {
  if (city) {
    selectedCityName.textContent = city.name;
    selectedCityCode.textContent = city.code;
  } else {
    selectedCityName.textContent = "";
    selectedCityCode.textContent = "";
  }
}

// Function to create dropdown items
function createDropdownItem(city) {
  const dropdownItem = document.createElement("div");
  dropdownItem.classList.add("dropdown-item");

  const cityName = document.createElement("span");
  cityName.classList.add("city-name");
  cityName.textContent = city.name;

  const cityCode = document.createElement("span");
  cityCode.classList.add("city-code");
  cityCode.textContent = city.code;

  dropdownItem.appendChild(cityName);
  dropdownItem.appendChild(cityCode);

  dropdownItem.addEventListener("click", function () {
    cityInput.value = city.name;
    selectedCity = city;
    updateSelectedCity(city);
    populateDropdown(
      cities.filter((c) =>
        c.name.toLowerCase().startsWith(cityInput.value.toLowerCase().trim())
      )
    );
    hideDropdown();
  });

  return dropdownItem;
}

// Function to populate dropdown
function populateDropdown(filteredCities) {
  // Clear existing nearest airports
  nearestAirportsContainer.innerHTML = "";

  // If no input, show all cities except selected
  const citiesToShow = filteredCities.length > 0 ? filteredCities : cities;

  // Always update selected city
  updateSelectedCity(selectedCity);

  // Add other cities to nearest airports
  citiesToShow
    .filter((city) => city !== selectedCity)
    .forEach((city) => {
      const dropdownItem = createDropdownItem(city);
      nearestAirportsContainer.appendChild(dropdownItem);
    });

  showDropdown();
}

// Function to clear input and reset selected city
function clearInput() {
  console.log("Clearing input");
  cityInput.value = "";
  selectedCity = null;
  updateSelectedCity(null);
  populateDropdown(cities);
}

// Input event listener
cityInput.addEventListener("input", function () {
  const inputText = cityInput.value.toLowerCase().trim();

  // Filter cities that start with the input text
  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().startsWith(inputText)
  );

  // Populate dropdown with filtered or all cities
  populateDropdown(filteredCities);
});

// Focus event listener
cityInput.addEventListener("focus", function () {
  // When focused, always show the last selected city
  updateSelectedCity(selectedCity);
  if (selectedCity) {
    cityInput.value = selectedCity.name;
  }

  // Populate dropdown with all cities
  populateDropdown(cities);
});

// Click outside dropdown to close
document.addEventListener("click", function (event) {
  if (!cityDropdown.contains(event.target) && event.target !== cityInput) {
    hideDropdown();
  }
});

// НОВОЕ РЕШЕНИЕ: Переопределяем стили и добавляем кнопку очистки
function implementClearButton() {
  // Если код города существует
  if (selectedCityCode) {
    console.log("Adding explicit clear button next to city code");

    // Создаем новую кнопку очистки
    const clearButton = document.createElement("button");
    clearButton.type = "button";
    clearButton.classList.add("city-clear-button");
    clearButton.innerHTML = "✕";
    //  clearButton.style.marginLeft = "4px";
    clearButton.style.backgroundColor = "transparent"; // Убираем красный цвет фона
    clearButton.style.color = "#888"; // Устанавливаем серый цвет для X
    clearButton.style.border = "none";
    clearButton.style.borderRadius = "0"; // Убираем круглую форму
    clearButton.style.width = "16px";
    clearButton.style.height = "16px";
    clearButton.style.cursor = "pointer";
    clearButton.style.fontSize = "16px";
    clearButton.style.lineHeight = "1";
    clearButton.style.padding = "0";
    clearButton.style.display = "inline-flex";
    clearButton.style.alignItems = "center";
    clearButton.style.justifyContent = "center";

    clearButton.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log("Clear button clicked");
      clearInput();
    });

    // Добавляем кнопку после кода города
    const parentElement = selectedCityCode.parentNode;
    parentElement.insertBefore(clearButton, selectedCityCode.nextSibling);
    console.log("Clear button added");

    // Скрываем оригинальную SVG иконку, если она существует
    const style = document.createElement("style");
    style.innerHTML = `
       .city-code.first-line::after {
         display: none !important;
       }
     `;
    document.head.appendChild(style);

    return clearButton;
  } else {
    console.error("Could not find selectedCityCode element");
    return null;
  }
}

// Альтернативное решение: Перехватываем клики на родительском элементе
function setupClickInterception() {
  // Находим родительский контейнер, содержащий и имя города, и код города
  const cityContainer = selectedCityName
    ? selectedCityName.closest("div")
    : null;

  if (cityContainer) {
    console.log(
      "Setting up click interception on city container",
      cityContainer
    );

    // Добавляем обработчик на весь контейнер
    cityContainer.addEventListener("click", function (e) {
      // Проверяем, был ли клик в правой части контейнера
      const rect = cityContainer.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const containerWidth = rect.width;

      console.log(
        `Click at ${clickX}px from left, container width: ${containerWidth}px`
      );

      // Если клик был в правой части контейнера (последние 30px)
      if (clickX > containerWidth - 30) {
        console.log("Click detected in the right part, clearing input");
        clearInput();
      }
    });

    return true;
  } else {
    console.error("Could not find city container for click interception");
    return false;
  }
}

// Initialize with default city
cityInput.value = selectedCity.name;
updateSelectedCity(selectedCity);

// Применяем оба решения, по крайней мере одно из них должно сработать
const clearButtonAdded = implementClearButton();
const clickInterceptionSetup = setupClickInterception();

// Сообщаем в консоль результаты
console.log("Clear button setup:", clearButtonAdded ? "SUCCESS" : "FAILED");
console.log(
  "Click interception setup:",
  clickInterceptionSetup ? "SUCCESS" : "FAILED"
);

// блок куда ///////////////////////
///////////////////////////////////

const cityOutput = document.getElementById("cityOutput");
const cityInputDestination = document.querySelector(".input-field.second");
const cityDropdownDestination = document.getElementById("cityDropdownSecond");
const selectedCityNameDestination = document.querySelector(
  ".city-name.first-sity2"
);
const selectedCityCodeDestination = document.querySelector(
  ".city-code.first-line2"
);
const nearestAirportsContainerDestination =
  document.querySelector(".dropdown-where");

// For debugging
console.log("Destination Elements found:");
console.log("cityInputDestination:", cityInputDestination);
console.log("cityDropdownDestination:", cityDropdownDestination);
console.log("selectedCityNameDestination:", selectedCityNameDestination);
console.log("selectedCityCodeDestination:", selectedCityCodeDestination);
console.log(
  "nearestAirportsContainerDestination:",
  nearestAirportsContainerDestination
);

// Cities data with names and airport codes
const citiesDestination = [
  { name: "Варшава", code: "WAW" },
  { name: "Краков", code: "KRK" },
  { name: "Гданьск", code: "GDN" },
  { name: "Вроцлав", code: "WRO" },
  { name: "Познань", code: "POZ" },
  { name: "Лодзь", code: "LCJ" },
  { name: "Катовице", code: "KTW" },
  { name: "Люблин", code: "LUZ" },
];

// No default destination city now, field starts empty
let selectedDestinationCity = null;

// Function to show the dropdown
function showDestinationDropdown() {
  cityDropdownDestination.style.display = "block";
}

// Function to hide the dropdown
function hideDestinationDropdown() {
  cityDropdownDestination.style.display = "none";
}

// Function to update the selected destination city display
function updateSelectedDestinationCity(city) {
  console.log("Updating selected destination city:", city);

  if (city) {
    // Update the "Выбранный город" section
    selectedCityNameDestination.textContent = city.name;
    selectedCityCodeDestination.textContent = city.code;

    // Ensure the selected city container is visible
    const selectedCityContainer =
      selectedCityNameDestination.closest(".dropdown-item");
    if (selectedCityContainer) {
      selectedCityContainer.style.display = "flex";
    }
  } else {
    selectedCityNameDestination.textContent = "";
    selectedCityCodeDestination.textContent = "";
  }
}

// Function to create dropdown items for destination
function createDestinationDropdownItem(city) {
  const dropdownItem = document.createElement("div");
  dropdownItem.classList.add("dropdown-item");

  const cityName = document.createElement("span");
  cityName.classList.add("city-name");
  cityName.textContent = city.name;

  const cityCode = document.createElement("span");
  cityCode.classList.add("city-code");
  cityCode.textContent = city.code;

  dropdownItem.appendChild(cityName);
  dropdownItem.appendChild(cityCode);

  dropdownItem.addEventListener("click", function () {
    console.log("City selected:", city.name);

    // Update the input value
    cityInputDestination.value = city.name;

    // Store the selected city
    selectedDestinationCity = city;

    // Update the selected city display
    updateSelectedDestinationCity(city);

    // Close the dropdown after selection
    hideDestinationDropdown();
  });

  return dropdownItem;
}

// Function to populate destination dropdown
function populateDestinationDropdown(filteredCities) {
  // Clear existing nearest airports
  nearestAirportsContainerDestination.innerHTML = "";

  // If no input, show all cities
  const citiesToShow =
    filteredCities.length > 0 ? filteredCities : citiesDestination;

  // Add cities to nearest airports section
  citiesToShow.forEach((city) => {
    const dropdownItem = createDestinationDropdownItem(city);
    nearestAirportsContainerDestination.appendChild(dropdownItem);
  });

  // Make sure the dropdown is visible
  showDestinationDropdown();
}

// Function to clear input and reset selected destination city
function clearDestinationInput() {
  console.log("Clearing destination input");
  cityInputDestination.value = "";
  selectedDestinationCity = null;
  updateSelectedDestinationCity(null);
}

// Input event listener for destination
cityInputDestination.addEventListener("input", function () {
  const inputText = cityInputDestination.value.toLowerCase().trim();

  // Filter cities that start with the input text
  const filteredCities = citiesDestination.filter((city) =>
    city.name.toLowerCase().startsWith(inputText)
  );

  // Populate dropdown with filtered or all cities
  populateDestinationDropdown(filteredCities);
  showDestinationDropdown(); // Explicitly show dropdown on input
});

// Focus event listener for destination
cityInputDestination.addEventListener("focus", function () {
  // When focused, show all cities in dropdown
  populateDestinationDropdown(citiesDestination);
  showDestinationDropdown(); // Explicitly show dropdown on focus

  // Display the selected city if one exists
  if (selectedDestinationCity) {
    updateSelectedDestinationCity(selectedDestinationCity);
  }
});

// Click outside dropdown to close
document.addEventListener("click", function (event) {
  if (
    !cityDropdownDestination.contains(event.target) &&
    event.target !== cityInputDestination
  ) {
    hideDestinationDropdown();
  }
});

// Add clear button for destination
function implementDestinationClearButton() {
  // If city code exists
  if (selectedCityCodeDestination) {
    console.log("Adding explicit clear button next to destination city code");

    // Create new clear button
    const clearButton = document.createElement("button");
    clearButton.type = "button";
    clearButton.classList.add("city-clear-button");
    clearButton.innerHTML = "✕";
    clearButton.style.backgroundColor = "transparent";
    clearButton.style.color = "#888";
    clearButton.style.border = "none";
    clearButton.style.borderRadius = "0";
    clearButton.style.width = "16px";
    clearButton.style.height = "16px";
    clearButton.style.cursor = "pointer";
    clearButton.style.fontSize = "16px";
    clearButton.style.lineHeight = "1";
    clearButton.style.padding = "0";
    clearButton.style.display = "inline-flex";
    clearButton.style.alignItems = "center";
    clearButton.style.justifyContent = "center";

    clearButton.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log("Destination clear button clicked");
      clearDestinationInput();
    });

    // Add button after city code
    const parentElement = selectedCityCodeDestination.parentNode;
    parentElement.insertBefore(
      clearButton,
      selectedCityCodeDestination.nextSibling
    );
    console.log("Destination clear button added");

    // Hide original SVG icon if it exists
    const style = document.createElement("style");
    style.innerHTML = `
       .city-code.first-line2::after {
         display: none !important;
       }
     `;
    document.head.appendChild(style);

    return clearButton;
  } else {
    console.error("Could not find selectedCityCodeDestination element");
    return null;
  }
}

// Alternative solution: Intercept clicks on parent element
function setupDestinationClickInterception() {
  // Find parent container containing both city name and code
  const cityContainer = selectedCityNameDestination
    ? selectedCityNameDestination.closest("div")
    : null;

  if (cityContainer) {
    console.log(
      "Setting up click interception on destination city container",
      cityContainer
    );

    // Add handler to the entire container
    cityContainer.addEventListener("click", function (e) {
      // Check if click was in the right part of the container
      const rect = cityContainer.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const containerWidth = rect.width;

      console.log(
        `Destination click at ${clickX}px from left, container width: ${containerWidth}px`
      );

      // If click was in the right part of the container (last 30px)
      if (clickX > containerWidth - 30) {
        console.log(
          "Click detected in the right part, clearing destination input"
        );
        clearDestinationInput();
      }
    });

    return true;
  } else {
    console.error(
      "Could not find destination city container for click interception"
    );
    return false;
  }
}

// Initialize with empty field
cityInputDestination.value = "";
updateSelectedDestinationCity(null);

// Apply both solutions, at least one should work
const clearButtonDestinationAdded = implementDestinationClearButton();
const clickDestinationInterceptionSetup = setupDestinationClickInterception();

// Log results to console
console.log(
  "Destination clear button setup:",
  clearButtonDestinationAdded ? "SUCCESS" : "FAILED"
);
console.log(
  "Destination click interception setup:",
  clickDestinationInterceptionSetup ? "SUCCESS" : "FAILED"
);

// поменять местами //////////
/////////////////////////////

// Находим кнопку "Поменять местами"
const swapButton = document.querySelector(".swap-button");

// Добавляем обработчик события на кнопку
swapButton.addEventListener("click", function () {
  // Меняем местами выбранные города
  const tempCity = selectedCity;
  selectedCity = selectedDestinationCity;
  selectedDestinationCity = tempCity;

  // Обновляем отображение в поле "ОТКУДА"
  if (selectedCity) {
    cityInput.value = selectedCity.name;
    updateSelectedCity(selectedCity);
  } else {
    cityInput.value = "";
    updateSelectedCity(null);
  }

  // Обновляем отображение в поле "КУДА"
  if (selectedDestinationCity) {
    cityInputDestination.value = selectedDestinationCity.name;
    updateSelectedDestinationCity(selectedDestinationCity);
  } else {
    cityInputDestination.value = "";
    updateSelectedDestinationCity(null);
  }

  // Закрываем выпадающие списки, если они открыты
  hideDropdown();
  hideDestinationDropdown();
});

// сместить вверх КУДА ////////
//////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
  const cityNameSpan = document.querySelector(".city-name.first-sity2"); // Находим span с городом
  const cityLabel = document.querySelector("label[for='cityInputDestination']"); // Label поля
  const inputField = document.getElementById("cityInputDestination"); // Сам input

  if (!cityNameSpan || !cityLabel || !inputField) {
    console.warn("Не найдены нужные элементы!");
    return;
  }

  function updateLabelPosition() {
    const isMobile = window.matchMedia("(max-width: 756px)").matches;
    if (cityNameSpan.textContent.trim() !== "") {
      cityLabel.style.position = "absolute";
      cityLabel.style.bottom = "40px";
      cityLabel.style.fontSize = "12px";
      inputField.style.paddingTop = isMobile ? "70px" : "30px";
      inputField.style.paddingBottom = isMobile ? "8px" : "";
      inputField.style.marginTop = isMobile ? "-30px" : "";
      inputField.style.marginLeft = isMobile ? "0px" : "10px";
    } else {
      cityLabel.style.position = "";
      cityLabel.style.top = "";
      cityLabel.style.fontSize = "";
      inputField.style.paddingTop = "";
    }
  }

  // Следим за изменением названия города
  const observer = new MutationObserver(updateLabelPosition);
  observer.observe(cityNameSpan, { childList: true, subtree: true });

  // Вызываем сразу, если уже есть город
  updateLabelPosition();
});

// TODO:
// плавная анимация появления карточек направления ////////
//////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  const rows = document.querySelectorAll(".direction-row");

  rows.forEach((row, index) => {
    setTimeout(() => {
      row.classList.add("show");
    }, index * 200); // добавляет небольшую задержку между элементами
  });
});
