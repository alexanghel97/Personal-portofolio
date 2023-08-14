"use strict";

const form = document.querySelector("form");
const popup = document.querySelector(".popup");
const closeBtn = document.querySelector(".close-btn");

// Show pop-up message

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const fullNameInput = document.querySelector(
    'input[placeholder="Full Name"]'
  );
  const fullName = fullNameInput.value;
  const popupName = document.querySelector(".popup h3");
  popupName.textContent = `Thank you for your message, ${fullName} !`;

  popup.classList.remove("hidden");
});

closeBtn.addEventListener("click", function () {
  popup.classList.add("hidden");
});

window.onscroll = () => {
  // sticly header
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);
};

// hide popup on page refresh

function hidePopup() {
  const popup = document.querySelector(".popup");
  popup.classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", function () {
  hidePopup();
});
