"use strict";

const searchBtn = document.querySelector(".search-button");
const foods = document.querySelector(".foods");
const searchText = document.querySelector(".input-text");
const closeWindow = document.getElementById("closeWindow");
const recipePopUp = document.getElementById("recipePopUp");

if (closeWindow && recipePopUp) {
  closeWindow.addEventListener("click", function () {
    recipePopUp.classList.add("hidden");
  });
}

const getRecipe = function (id) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const recipe = data.meals[0];
      const recipeName = recipe.strMeal;
      const recipeInstructions = recipe.strInstructions;
      const recipeMainIngredient = recipe.strIngredient3;

      const recipeTitle = document.getElementById("recipeTitle");
      const recipeInstructionsText =
        document.getElementById("recipeInstructions");
      const recipeMainIngredientText = document.getElementById(
        "recipeMainIngredient"
      );
      const recipeImage = document.getElementById("recipeImage");
      const recipeVideo = document.getElementById("recipeVideo");

      recipeVideo.href = recipe.strYoutube;
      recipeImage.src = recipe.strMealThumb;
      recipeTitle.textContent = recipeName;
      recipeMainIngredientText.textContent = recipeMainIngredient;
      recipeInstructionsText.textContent = recipeInstructions;

      recipePopUp.classList.remove("hidden");
      console.log(data.meals);
    });
};

const displayResults = function (meals) {
  foods.innerHTML = "";
  if (meals) {
    meals.forEach((meal) => {
      const newMeal = document.createElement("div");
      newMeal.classList.add("meal");

      const mealImage = document.createElement("img");
      mealImage.src = meal.strMealThumb;
      mealImage.alt = meal.strMeal;
      mealImage.style.height = "300px";
      mealImage.style.width = "400px";
      mealImage.style.borderRadius = "10px";

      const mealName = document.createElement("h3");
      mealName.textContent = meal.strMeal;

      const recipeButton = document.createElement("button");
      recipeButton.classList.add("recipe-button");
      recipeButton.textContent = "Get Recipe";

      recipeButton.addEventListener("click", function () {
        getRecipe(meal.idMeal);
      });

      newMeal.appendChild(mealImage);
      newMeal.appendChild(mealName);
      newMeal.appendChild(recipeButton);

      foods.appendChild(newMeal);
    });
  } else {
    const noResultsMsg = document.createElement("p");
    noResultsMsg.textContent = "No results found";
    foods.appendChild(noResultsMsg);
  }
};

searchBtn.addEventListener("click", function () {
  const ing = searchText.value;
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayResults(data.meals);
    })
    .catch((error) => {
      console.log(`Error`, error);
    });
});
