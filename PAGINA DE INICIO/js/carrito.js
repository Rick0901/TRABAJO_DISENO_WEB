// Espera a que todo el contenido HTML esté cargado
document.addEventListener("DOMContentLoaded", () => {

  // Recupera el usuario logueado desde localStorage (si existe)
  const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));

  // Referencia al elemento donde se muestra el saludo
  const saludo = document.getElementById("saludo-carrito");

  // Si hay usuario logueado, muestra su nombre en mayúsculas
  // Si no hay usuario logueado, muestra saludo genérico
  saludo.textContent = usuarioActual && usuarioActual.nombre
    ? `HOLA ${usuarioActual.nombre.toUpperCase()}`
    : "HOLA USUARIO";

  // Recupera el carrito guardado en localStorage o inicializa vacío
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Referencias a elementos del DOM para mostrar datos del carrito
  const carritoItems = document.getElementById("carrito-items");
  const totalItems = document.getElementById("total-items");
  const totalProductos = document.getElementById("total-productos");
  const montoDescuentos = document.getElementById("monto-descuentos");
  const totalFinal = document.getElementById("total-final");

  // Función principal para renderizar todo el carrito
  function renderCarrito() {
    carritoItems.innerHTML = ""; // Limpia tabla antes de renderizar
    let subtotal = 0;
    let descuentos = 0;

    // Recorre cada producto del carrito
    carrito.forEach((item, index) => {
      const fila = document.createElement("tr"); // Crea una fila nueva

      // Columna producto: imagen + nombre + detalle
      const colProducto = document.createElement("td");
      colProducto.innerHTML = `
        <div class="producto-info">
          <img src="${item.imagen}" alt="${item.nombre}">
          <div>
            <strong>${item.nombre}</strong><br>
            ${item.detalle || ""}
          </div>
        </div>
      `;
      fila.appendChild(colProducto);

      // Columna precio unitario
      const colPrecio = document.createElement("td");
      colPrecio.textContent = `S/${item.precio.toFixed(2)}`;
      fila.appendChild(colPrecio);

      // Columna cantidad con botones + y -
      const colCantidad = document.createElement("td");
      colCantidad.innerHTML = `
        <button class="btn-restar">-</button>
        <span class="cantidad">${item.cantidad}</span>
        <button class="btn-sumar">+</button>
      `;
      fila.appendChild(colCantidad);

      // Columna total por producto
      const colTotal = document.createElement("td");
      const precioTotalItem = item.precio * item.cantidad;
      colTotal.textContent = `S/${precioTotalItem.toFixed(2)}`;
      fila.appendChild(colTotal);

      // Agrega la fila completa a la tabla
      carritoItems.appendChild(fila);

      // Suma subtotal y descuentos
      subtotal += precioTotalItem;
      descuentos += item.descuento || 0;

      // Botón restar cantidad
      const btnRestar = colCantidad.querySelector(".btn-restar");
      // Botón sumar cantidad
      const btnSumar = colCantidad.querySelector(".btn-sumar");

      // Evento para restar cantidad
      btnRestar.addEventListener("click", () => {
        if (item.cantidad > 1) {
          item.cantidad--;
        } else {
          carrito.splice(index, 1); // Si llega a 0, elimina producto del array
        }
        guardarCarrito(); // Guarda cambios en localStorage
        renderCarrito();  // Vuelve a renderizar carrito
      });

      // Evento para sumar cantidad
      btnSumar.addEventListener("click", () => {
        item.cantidad++;
        guardarCarrito();
        renderCarrito();
      });
    });

    // Actualiza totales en resumen del carrito
    totalItems.textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    totalProductos.textContent = `S/${subtotal.toFixed(2)}`;
    montoDescuentos.textContent = `-S/${descuentos.toFixed(2)}`;
    totalFinal.textContent = `S/${(subtotal - descuentos).toFixed(2)}`;
  }

  // Guarda carrito actualizado en localStorage
  function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  // Llama a renderCarrito para mostrar datos iniciales
  renderCarrito();
//btn para continuar comprando redirige al catalogo
 const btnContinuar = document.querySelector(".btn-continuar-compra");
btnContinuar.addEventListener("click", () => {
  window.location.href = "Productos.html"; // o principal.html según tu flujo
});
//btn para continuar comprando redirige al pago
const btnIrAPagar = document.querySelector(".btn-ir-a-pagar");
btnIrAPagar.addEventListener("click", () => {
  window.location.href = "pago_y_confirmacion.html";
});
});
