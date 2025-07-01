// Espera a que todo el contenido cargue
document.addEventListener("DOMContentLoaded", () => {

  // Obtiene el nombre del usuario logueado desde localStorage
  const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));

  // Cambia el saludo si existe usuario logueado
  const saludo = document.getElementById("saludo-carrito");
  if (usuarioActual && usuarioActual.nombre) {
    saludo.textContent = `HOLA ${usuarioActual.nombre.toUpperCase()}`;
  } else {
    saludo.textContent = "HOLA USUARIO";
  }

  // Aquí obtendrías los productos del carrito (simulación)
  // Normalmente vienen de localStorage o de una base de datos
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const carritoItems = document.getElementById("carrito-items");
  const totalItems = document.getElementById("total-items");
  const totalProductos = document.getElementById("total-productos");
  const montoDescuentos = document.getElementById("monto-descuentos");
  const totalFinal = document.getElementById("total-final");

  let subtotal = 0;
  let descuentos = 0;

  // Recorre los productos y crea filas
  carrito.forEach(item => {
    const fila = document.createElement("tr");

    // Columna producto
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

    // Columna cantidad
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

    carritoItems.appendChild(fila);

    subtotal += precioTotalItem;
    descuentos += item.descuento || 0; // Si tiene descuento, súmalo
  });

  // Actualiza los totales
  totalItems.textContent = carrito.length;
  totalProductos.textContent = `S/${subtotal.toFixed(2)}`;
  montoDescuentos.textContent = `-S/${descuentos.toFixed(2)}`;
  totalFinal.textContent = `S/${(subtotal - descuentos).toFixed(2)}`;

  // Botón continuar compra
  const btnContinuar = document.querySelector(".btn-continuar-compra");
  btnContinuar.addEventListener("click", () => {
    alert("Compra finalizada. Gracias por comprar en Inka Textil");
    // Aquí podrías redirigir o limpiar el carrito
  });

});
