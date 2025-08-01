document.addEventListener("DOMContentLoaded", async () => {
  const recipeSelect = document.getElementById("recipe-select");
  const categorySelect = document.getElementById("category-select");
  const form = document.getElementById("update-recipe-form");
  const instructionsDiv = document.getElementById("instructions");
  const ingredientsDiv = document.getElementById("ingredients");
  const message = document.getElementById("message");
  const token = localStorage.getItem("token");

  let allRecipes = [];

  // Load all recipes
  const loadRecipes = async () => {
    const res = await fetch("/api/recipes", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const recipes = await res.json();
    allRecipes = recipes;

    recipeSelect.innerHTML = `<option value="">Select a recipe</option>`;
    recipes.forEach(recipe => {
      const option = document.createElement("option");
      option.value = recipe.id;
      option.textContent = recipe.title;
      recipeSelect.appendChild(option);
    });
  };

  // Load all categories
  const loadCategories = async () => {
    const res = await fetch("/api/categories", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const categories = await res.json();

    categorySelect.innerHTML = "";
    categories.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat.id;
      option.textContent = cat.name;
      categorySelect.appendChild(option);
    });
  };

  // Populate form with selected recipe
  recipeSelect.addEventListener("change", () => {
    const selected = allRecipes.find(r => r.id == recipeSelect.value);
    if (!selected) return;

    form.title.value = selected.title;
    form.description.value = selected.description;
    form.cooking_time_minutes.value = selected.cooking_time_minutes;
    form.servings.value = selected.servings;
    form.category_id.value = selected.category_id;

    // Populate instructions
    instructionsDiv.innerHTML = "";
    for (let i = 1; i <= 10; i++) {
      const input = document.createElement("input");
      input.type = "text";
      input.name = `instruction_${i}`;
      input.placeholder = `Step ${i}`;
      const step = selected.instructions.find(ins => ins.step_number === i);
      input.value = step ? step.instruction : "";
      instructionsDiv.appendChild(input);
      instructionsDiv.appendChild(document.createElement("br"));
    }

    // Populate ingredients
    ingredientsDiv.innerHTML = "";
    for (let i = 0; i < 10; i++) {
      const name = document.createElement("input");
      name.type = "text";
      name.name = `ingredient_name_${i}`;
      name.placeholder = "Ingredient name";

      const qty = document.createElement("input");
      qty.type = "text";
      qty.name = `quantity_${i}`;
      qty.placeholder = "Quantity";

      const unit = document.createElement("input");
      unit.type = "text";
      unit.name = `unit_${i}`;
      unit.placeholder = "Unit";

      const ing = selected.ingredients[i];
      if (ing) {
        name.value = ing.name;
        qty.value = ing.RecipeIngredient?.quantity || "";
        unit.value = ing.RecipeIngredient?.unit || "";
      }

      ingredientsDiv.appendChild(name);
      ingredientsDiv.appendChild(qty);
      ingredientsDiv.appendChild(unit);
      ingredientsDiv.appendChild(document.createElement("br"));
    }
  });

  // Submit update
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const recipeId = recipeSelect.value;

    const updatedData = {
      title: formData.get("title"),
      description: formData.get("description"),
      cooking_time_minutes: parseInt(formData.get("cooking_time_minutes")),
      servings: parseInt(formData.get("servings")),
      category_id: parseInt(formData.get("category_id")),
      instructions: [],
      ingredients: [],
    };

    for (let i = 1; i <= 10; i++) {
      const step = formData.get(`instruction_${i}`);
      if (step && step.trim()) {
        updatedData.instructions.push({ step_number: i, instruction: step });
      }
    }

    for (let i = 0; i < 10; i++) {
      const name = formData.get(`ingredient_name_${i}`);
      const qty = formData.get(`quantity_${i}`);
      const unit = formData.get(`unit_${i}`);
      if (name && name.trim()) {
        updatedData.ingredients.push({ name, quantity: qty, unit });
      }
    }

    try {
      const res = await fetch(`/api/recipes/update/${recipeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedData),
      });

      const result = await res.json();
      if (res.ok) {
        message.textContent = "Recipe updated successfully!";
        await loadRecipes(); // Refresh list
      } else {
        message.textContent = result.error || "Failed to update recipe.";
      }
    } catch (err) {
      console.error("Update error:", err);
      message.textContent = "Update failed.";
    }
  });

  await loadCategories();
  await loadRecipes();
});
