document.addEventListener("DOMContentLoaded", function () {
  const filtros = {
    categoria: document.getElementById("filtro-categoria"),
    talla: document.getElementById("filtro-talla"),
    color: document.getElementById("filtro-color"),
    material: document.getElementById("filtro-material"),
    precio: document.getElementById("filtro-precio")
  };

  const productos = document.querySelectorAll(".product-card");

  function aplicarFiltros() {
    productos.forEach((producto) => {
      const coincideCategoria = !filtros.categoria.value || producto.dataset.categoria === filtros.categoria.value;
      const coincideTalla = !filtros.talla.value || producto.dataset.talla === filtros.talla.value;
      const coincideColor = !filtros.color.value || producto.dataset.color === filtros.color.value;
      const coincideMaterial = !filtros.material.value || producto.dataset.material === filtros.material.value;
      const coincidePrecio = !filtros.precio.value || producto.dataset.precio === filtros.precio.value;

      if (coincideCategoria && coincideTalla && coincideColor && coincideMaterial && coincidePrecio) {
        producto.style.display = "block"; // mantiene estilos
      } else {
        producto.style.display = "none";
      }
    });
  }

  Object.values(filtros).forEach((select) => {
    select.addEventListener("change", aplicarFiltros);
  });
});
