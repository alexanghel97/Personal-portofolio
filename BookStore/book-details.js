"use strict";

const params = new URLSearchParams(window.location.search);
const bookId = params.get("id");

let currentImageIndex = 0;

fetch("books.json")
  .then((response) => response.json())
  .then((data) => {
    const book = data.find((books) => books.id === Number(bookId));

    if (book) {
      document.querySelector(".book-details-title").textContent = book.title;
      document.querySelector(
        ".book-details-category"
      ).textContent = `Category : ${book.category}`;
      document.querySelector(
        ".book-details-language"
      ).textContent = `Language : ${book.language}`;
      document.querySelector(
        ".book-details-publishing"
      ).textContent = `Date of publishing : ${book.publishing}`;
      document.querySelector(
        ".book-details-isbn"
      ).textContent = `ISBN : ${book.isbn}`;
      document.querySelector(
        ".book-details-dimension"
      ).textContent = `Dimension : ${book.dimension}`;
      document.querySelector(
        ".book-details-author"
      ).textContent = `Written by : ${book.author}`;
      document.querySelector(
        ".book-details-price"
      ).textContent = `Price : ${book.price} $`;
      document.querySelector(
        ".book-details-description-title"
      ).textContent = `Description`;
      document.querySelector(
        ".book-details-description"
      ).textContent = `${book.description}`;

      const bookDetailsImageContainer = document.querySelector(
        ".book-details-image-container"
      );

      //   Generate img elements

      const images = book.imageDetailsSrc.map((src) => {
        const img = document.createElement("img");
        img.src = src;
        img.classList.add("book-details-image");
        img.style.display = "none";
        bookDetailsImageContainer.appendChild(img);
        return img;
      });

      // Initial display
      images[0].style.display = "block";

      // Next Image function

      function showNextImage() {
        images[currentImageIndex].style.display = "none";
        currentImageIndex = (currentImageIndex + 1) % images.length;
        images[currentImageIndex].style.display = "block";
      }

      //   Previous image function

      function showPreviousImage() {
        images[currentImageIndex].style.display = "none";
        currentImageIndex =
          (currentImageIndex - 1 + images.length) % images.length;
        images[currentImageIndex].style.display = "block";
      }

      //   Event listeners for buttons

      document
        .getElementsByClassName("next-btn")[0]
        .addEventListener("click", showNextImage);
      document
        .getElementsByClassName("previous-btn")[0]
        .addEventListener("click", showPreviousImage);
    }
  });
