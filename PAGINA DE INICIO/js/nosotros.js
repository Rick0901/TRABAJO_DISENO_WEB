// index.js

document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("search-btn");
  const searchInput = document.getElementById("search");

  searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query !== "") {
      console.log("Buscando:", query);
      // Aquí puedes implementar la lógica de búsqueda real
    }
  });
});
