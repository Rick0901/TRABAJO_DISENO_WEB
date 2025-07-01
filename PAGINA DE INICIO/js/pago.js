document.addEventListener("DOMContentLoaded", () => {

  // Carga el usuario actual
  const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
  const saludo = document.getElementById("saludo-envio");
  if (usuarioActual && usuarioActual.nombre) {
    saludo.textContent = `HOLA ${usuarioActual.nombre.toUpperCase()}`;
  }

  // Obtiene carrito
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  let subtotal = 0;
  let descuentos = 0;

  carrito.forEach(item => {
    subtotal += item.precio * item.cantidad;
    descuentos += item.descuento || 0;
  });

  document.getElementById("items-total").textContent = carrito.length;
  document.getElementById("productos-total").textContent = subtotal.toFixed(2);
  document.getElementById("descuentos-total").textContent = `-${descuentos.toFixed(2)}`;
  document.getElementById("total-final").textContent = (subtotal - descuentos).toFixed(2);

  // Botón finalizar compra
  const finalizar = document.querySelector(".btn-finalizar-compra");
  finalizar.addEventListener("click", () => {
    alert("¡Compra finalizada exitosamente!");
    // Aquí limpiarías carrito o rediriges
  });

});
