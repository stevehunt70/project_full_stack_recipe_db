document.addEventListener("DOMContentLoaded", async () => {

  const instructionsDiv = document.getElementById("instructions");
  const ingredientsDiv = document.getElementById("ingredients");
  const categoryDropdown = document.getElementById("category-select");
  const message = document.getElementById("message");
  const form = document.getElementById("add-recipe-form");
  const token = localStorage.getItem("token");

  if (!form) {
    console.error("Form with ID 'add-recipe-form' not found");
    return;
  }

  // ✅ Add 10 instruction input boxes
  for (let i = 1; i <= 10; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.name = `instruction_${i}`;
    input.placeholder = `Step ${i}`;
    instructionsDiv.appendChild(input);
    instructionsDiv.appendChild(document.createElement("br"));
  }

  // ✅ Add 10 ingredient input groups
  for (let i = 0; i < 10; i++) {
    const ingredientName = document.createElement("input");
    ingredientName.type = "text";
    ingredientName.name = `ingredient_name_${i}`;
    ingredientName.placeholder = "Ingredient name";

    const quantity = document.createElement("input");
    quantity.type = "text";
    quantity.name = `quantity_${i}`;
    quantity.placeholder = "Quantity";

    const unit = document.createElement("input");
    unit.type = "text";
    unit.name = `unit_${i}`;
    unit.placeholder = "Unit";

    ingredientsDiv.appendChild(ingredientName);
    ingredientsDiv.appendChild(quantity);
    ingredientsDiv.appendChild(unit);
    ingredientsDiv.appendChild(document.createElement("br"));
  }

  // ✅ Load categories into dropdown
  try {
    const res = await fetch("/api/categories", {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) throw new Error("Failed to fetch categories");

    const categories = await res.json();
    categoryDropdown.innerHTML = ""; // Clear default

    categories.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat.id;
      option.textContent = cat.name;
      categoryDropdown.appendChild(option);
    });
  } catch (err) {
    console.error("Failed to load categories:", err);
  }

  // 🧾 Form submission (example logic only)
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const recipeData = {
      title: formData.get("title"),
      description: formData.get("description"),
      cooking_time_minutes: parseInt(formData.get("cooking_time_minutes")),
      servings: parseInt(formData.get("servings")),
      category_id: parseInt(formData.get("category_id")),
      instructions: [],
      ingredients: [],
    };

    // Collect instructions
    for (let i = 1; i <= 10; i++) {
      const step = formData.get(`instruction_${i}`);
      if (step && step.trim() !== "") {
        recipeData.instructions.push({ step_number: i, instruction: step });
      }
    }

    // Collect ingredients
    for (let i = 0; i < 10; i++) {
      const name = formData.get(`ingredient_name_${i}`);
      const qty = formData.get(`quantity_${i}`);
      const unit = formData.get(`unit_${i}`);
      if (name && name.trim() !== "") {
        recipeData.ingredients.push({ name, quantity: qty, unit });
      }
    }

    // Send to backend
    try {
      const res = await fetch("/api/recipes/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(recipeData),
      });

      const result = await res.json();
      if (res.ok) {
        message.textContent = "Recipe added successfully!";
        form.reset();
      } else {
        message.textContent = result.error || "Failed to add recipe.";
      }
    } catch (err) {
      console.error("Error submitting recipe:", err);
      message.textContent = "Submission failed.";
    }
  });
});
