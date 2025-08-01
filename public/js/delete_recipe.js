document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  const select = document.getElementById("recipe-select");
  const deleteBtn = document.getElementById("delete-button");
  const message = document.getElementById("message");

  // Load recipes into dropdown
  try {
    const res = await fetch("/api/recipes", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const recipes = await res.json();
    select.innerHTML = ""; // Clear existing
    recipes.forEach(r => {
      const opt = document.createElement("option");
      opt.value = r.id;
      opt.textContent = r.title;
      select.appendChild(opt);
    });
  } catch (err) {
    message.textContent = "Failed to load recipes.";
    console.error(err);
  }

  // Handle delete
  deleteBtn.addEventListener("click", async () => {
    const recipeId = select.value;
    if (!recipeId) return;

    if (!confirm("Are you sure you want to delete this recipe?")) return;

    try {
      const res = await fetch(`/api/recipes/${recipeId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete");

      message.textContent = "Recipe deleted successfully!";
      select.remove(select.selectedIndex); // Remove from dropdown
    } catch (err) {
      message.textContent = "Error deleting recipe.";
      console.error(err);
    }
  });
});
