document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("busqueda-producto");
  const boton = document.getElementById("boton-buscar");
  const productos = document.querySelectorAll(".product-card");

  function filtrarProductos() {
    const texto = input.value.toLowerCase().trim();

    productos.forEach(producto => {
      const nombre = producto.querySelector("h3").textContent.toLowerCase();
      producto.style.display = nombre.includes(texto) ? "block" : "none";
    });
  }

  boton.addEventListener("click", filtrarProductos);
  input.addEventListener("keyup", function (e) {
    if (e.key === "Enter") filtrarProductos();
  });
});

