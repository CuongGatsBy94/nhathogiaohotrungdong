/**
 * @Author: Your name
 * @Date:   2024-11-08 19:41:19
 * @Last Modified by:   Your name
 * @Last Modified time: 2024-11-08 19:43:56
 */
const form = document.getElementById('loginForm');
const eField = form.querySelector(".email");
const eInput = eField.querySelector("input");
const pField = form.querySelector(".password");
const pInput = pField.querySelector("input");

form.onsubmit = (e) => {
  e.preventDefault();

  // Reset errors
  removeError(eField);
  removeError(pField);

  // Validate email
  if (eInput.value === "") {
    setError(eField, "Email can't be blank");
  } else {
    checkEmail();
  }

  // Validate password
  if (pInput.value === "") {
    setError(pField, "Password can't be blank");
  }

  // If no errors, form can be submitted (here we'll just print a message)
  if (
    !eField.classList.contains("error") &&
    !pField.classList.contains("error")
  ) {
    console.log("Form submitted successfully!");
  }

  setTimeout(() => {
    eField.classList.remove("shake");
    pField.classList.remove("shake");
  }, 500);
};

function setError(field, message) {
  field.classList.add("shake", "error");
  let errorTxt = field.querySelector(".error-txt");
  errorTxt.innerText = message;
}

function removeError(field) {
  field.classList.remove("shake", "error");
  let errorTxt = field.querySelector(".error-txt");
  errorTxt.innerText = "";
}

function checkEmail() {
  let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!eInput.value.match(pattern)) {
    setError(eField, "Enter a valid email address");
  } else {
    removeError(eField);
  }
}
