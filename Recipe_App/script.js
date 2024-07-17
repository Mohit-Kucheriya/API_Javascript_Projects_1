const searchBox = document.querySelector(".searchBox")
const searchBtn = document.querySelector(".searchBtn")
const recipeContainer = document.querySelector(".recipe-container")
const recipeDetail = document.querySelector(".recipe-detail");
const recipeContent = document.querySelector(".recipe-content")
const closeBtn = document.querySelector(".closeBtn")


// Fetching recipe 
const fetchRecipe = async (searchInput) => {
    recipeContainer.innerHTML = `<h2>Fetching Recipes..</h2>`

    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
        const response = await data.json()

        recipeContainer.innerHTML = ""
        // Recipe Info
        response.meals.forEach(meal => {
            console.log(meal);

            const recipeDiv = document.createElement("div");
            recipeDiv.classList.add("recipeDiv");
            recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p>${meal.strArea}</p>
        <p>${meal.strCategory}</p>
        `
            // Each button to view recipe
            const button = document.createElement("button");
            button.textContent = "View Recipe";
            recipeDiv.appendChild(button)

            button.addEventListener("click", () => {
                viewRecipe(meal)
            })

            recipeContainer.appendChild(recipeDiv)
        });
    } catch (error) {
        recipeContainer.innerHTML = `<h2>Error in Fetching Recipes..</h2>
        `


    }
}


const fetchIngredients = (meal) => {
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
        // meals ingredient
        const ingredient = meal[`strIngredient${i}`];
        console.log(ingredient)
        if (ingredient) {
            // meals ingredient measure
            const measure = meal[`strMeasure${i}`];
            console.log(measure)
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        } else {
            break;
        }
    }
    return ingredientsList;
}

const viewRecipe = (meal) => {
    recipeContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3 class="ingredients">Ingredients:</h3>
    <ul class="recipeIngredientList">${fetchIngredients(meal)}</ul>
    <div>
    <h3 class="instructions">Instructions:</h3>
    <p class="recipeInstruction">${meal.strInstructions}</p>
    </div>
    `

    recipeContent.parentElement.style.display = "block";

}

closeBtn.addEventListener("click", () => {
    recipeContent.parentElement.style.display = "none"
})

searchBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const searchInput = searchBox.value.trim()
    if (!searchInput) {
        recipeContainer.innerHTML = `<h2>Sorry Input field can't be empty</h2>`;
        return;
    }
    fetchRecipe(searchInput)
})