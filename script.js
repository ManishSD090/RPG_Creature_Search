const input = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const resultsDiv = document.getElementById("results-div");

const validUSPhone = /^(1\s?)?(\(\d{3}\)|\d{3})([\s\-]?)\d{3}([\s\-]?)\d{4}$/;

checkBtn.addEventListener("click", () => {
  const number = input.value.trim();

  if (number === "") {
    alert("Please provide a phone number");
    return;
  }

  if (validUSPhone.test(number)) {
    resultsDiv.textContent = `Valid US number: ${number}`;
  } else {
    resultsDiv.textContent = `Invalid US number: ${number}`;
  }
});

clearBtn.addEventListener("click", () => {
  input.value = "";
  resultsDiv.textContent = "";
});
