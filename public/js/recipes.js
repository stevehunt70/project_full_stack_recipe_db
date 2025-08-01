document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  console.log("Token from localStorage:", token);

  if (!token) {
    alert("You must be logged in to view recipes.");
    window.location.href = "/login.html";
    return;
  } 

  try {
    const response = await fetch("/api/recipes", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    if(!response.ok) {
      throw new Error('Failed to fetch recipes: ${response.status}');
    }
    console.log("Response status:", response.status);

    const recipes = await response.json();
    console.log("Fetched recipes: ", recipes);
    
    const container = document.getElementById("recipe-container");
    container.innerHTML = "";

    recipes.forEach((recipe) => {
      const card = document.createElement("div");
      card.className = "recipe-card";

      const categoryName = recipe.category ? recipe.category.name : "Uncategorized";

      const ingredientsList = recipe.ingredients?.map((ingredientObj) => {
        const ri = ingredientObj.RecipeIngredient || ingredientObj.recipe_ingredient;
        return `<li>${ri?.quantity ?? "?"} ${ri?.unit ?? ""} ${ingredientObj.name}</li>`;
      }).join("");

      const instructionsList = recipe.instructions?.map((step) => {
        return `<li>${step.instruction}</li>`;
      }).join("");

      card.innerHTML = `
        <h2>${recipe.title}</h2>
        <p><strong>Description:</strong> ${recipe.description}</p>
        <p><strong>Category:</strong> ${categoryName}</p>
        <p><strong>Time:</strong> ${recipe.cooking_time_minutes} minutes</p>
        <p><strong>Servings:</strong> ${recipe.servings}</p>

        <h4>Ingredients:</h4>
        <ul align="left">
          ${ingredientsList}
        </ul>

        <h4>Instructions:</h4>
        <ol align="left">
          ${instructionsList}
        </ol>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Failed to load recipes:", error);
    document.getElementById("recipe-container").innerHTML =
      "<p>There was an error loading recipes. Please try again later.</p>";
  }
});
