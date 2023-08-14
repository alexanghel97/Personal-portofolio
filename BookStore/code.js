"use strict";

let books = [];
const bookContainer = document.querySelector(".book-container");
const searchBarInput = document.querySelector(".search-bar input");
let cartIcon = document.querySelector("#cart-icon");
let cartElem = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
let cart = [];
let btnBuy = document.querySelector(".btn-buy");

fetch("books.json")
  .then((response) => response.json())
  .then((data) => {
    books = data;
    displayBooks(books);
    addCategories();
  });

function displayBooks(bookData) {
  bookContainer.innerHTML = ""; // clear previous book entries

  bookData.forEach((book) => {
    const bookDiv = document.createElement("div");
    const bookImage = document.createElement("img");
    const bookPrice = document.createElement("div");
    const bookTitle = document.createElement("div");
    const bookAuthor = document.createElement("div");
    const buyButton = document.createElement("button");
    const seeMoreButton = document.createElement("a");

    seeMoreButton.classList.add("see-more-button");
    seeMoreButton.href = `book-details.html?id=${book.id}`;
    seeMoreButton.target = "_blank";
    buyButton.classList.add("buy-button");
    bookPrice.classList.add("book-price");
    bookAuthor.classList.add("book-author");
    bookTitle.classList.add("book-title");
    bookImage.classList.add("book-image");
    bookDiv.classList.add("book-box");

    bookImage.src = book.imageSrc;
    bookAuthor.textContent = ` Written by ${book.author}`;
    bookTitle.textContent = book.title;
    bookPrice.textContent = ` Price : ${book.price}$`;
    seeMoreButton.textContent = `See More`;
    buyButton.textContent = `Buy now`;

    buyButton.addEventListener("click", () => {
      addToCart(book);
    });

    bookDiv.appendChild(bookImage);
    bookDiv.appendChild(bookTitle);
    bookDiv.appendChild(bookAuthor);
    bookDiv.appendChild(bookPrice);
    bookDiv.appendChild(seeMoreButton);
    bookDiv.appendChild(buyButton);
    bookContainer.appendChild(bookDiv);
  });
}

function searchBooks() {
  const searchText = searchBarInput.value.toLowerCase();
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchText) ||
      book.author.toLowerCase().includes(searchText)
  );
  displayBooks(filteredBooks);
}

searchBarInput.addEventListener("input", searchBooks);

function addCategories() {
  let categories = new Set();
  categories.add("All");
  books.forEach((book) => {
    categories.add(book.category);
  });

  const categoriesListDiv = document.querySelector("#categories-list");
  categories.forEach((category) => {
    const categoryOption = document.createElement("a");
    categoryOption.classList.add("dropdown-item");

    categoryOption.textContent = category;
    categoryOption.href = "#";
    categoryOption.addEventListener("click", function (e) {
      e.preventDefault();
      if (category === "All") {
        displayBooks(books);
      } else {
        filterBooksByCategory(category);
      }
    });
    categoriesListDiv.appendChild(categoryOption);
  });
}

function filterBooksByCategory(category) {
  const filteredBooks = books.filter((book) => book.category === category);
  displayBooks(filteredBooks);
}

// ------------------------------------------Shopping Cart-------------------------------------------

// Open Cart

cartIcon.onclick = () => {
  cartElem.classList.add("active");
};

// Close Cart

closeCart.onclick = () => {
  cartElem.classList.remove("active");
};

// Add to cart

function addToCart(book) {
  // Check if the book is already in the cart

  const alreadyInCart = cart.some((cartItem) => cartItem.id === book.id);

  if (alreadyInCart) {
    displayPopupAlert(`This book was already added to your cart !`);
    return;
  }

  cart.push(book);
  updateCartView();
  updateCartTotal();
  cartIcon.setAttribute("data-quantity", cart.length);
}

function displayPopupAlert(message) {
  const popupAlert = document.getElementById("customPopup");
  const closeAlert = document.getElementById("closePopup");
  const alertText = popupAlert.querySelector("p");

  alertText.textContent = message;

  popupAlert.style.display = "block";
  closeAlert.onclick = function () {
    popupAlert.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target === popupAlert) {
      popupAlert.style.display = "none";
    }
  };
}

function updateCartView() {
  const cartContent = document.querySelector(".cart-content");
  const booksInCart = document.createElement("div");
  const booksInCartContainer = document.querySelector(".books-in-cart");
  booksInCartContainer.innerHTML = "";

  cart.forEach((bookInCart, index) => {
    const cartBookItem = document.createElement("div");
    cartBookItem.classList.add("cart-book-item");

    const cartBookImage = document.createElement("img");
    cartBookImage.src = bookInCart.imageSrc;
    cartBookImage.classList.add("cart-book-image");

    const cartBookTitle = document.createElement("div");
    const cartBookPrice = document.createElement("div");

    cartBookTitle.textContent = bookInCart.title;
    cartBookPrice.textContent = `Price : ${bookInCart.price}$`;

    const removeButton = document.createElement("button");
    removeButton.classList.add("clear-button");
    removeButton.textContent = "clear";

    removeButton.addEventListener("click", () => {
      removeFromCart(index);
      updateCartView();
      updateCartTotal();
    });

    cartBookItem.appendChild(cartBookImage);
    cartBookItem.appendChild(cartBookTitle);
    cartBookItem.appendChild(cartBookPrice);
    cartBookItem.appendChild(removeButton);
    booksInCartContainer.appendChild(cartBookItem);
  });

  const totalDiv = document.querySelector(".total");
  const closeCartIcon = document.querySelector("#close-cart");

  cartContent.appendChild(totalDiv);
  cartContent.appendChild(btnBuy);
  cartContent.appendChild(closeCartIcon);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  cartIcon.setAttribute("data-quantity", cart.length);
}

function updateCartTotal() {
  const totalPriceDiv = document.querySelector(".total-price");
  let totalPrice = 0;

  cart.forEach((bookInCart) => {
    totalPrice += parseFloat(bookInCart.price);
  });

  totalPriceDiv.textContent = `${totalPrice.toFixed(2)}$`;
}

btnBuy.addEventListener("click", function () {
  if (cart.length > 0) {
    window.location.href = "success.html";
  } else {
    alert(`Your cart is empty. Please add aleast one item to it.`);
  }
});
