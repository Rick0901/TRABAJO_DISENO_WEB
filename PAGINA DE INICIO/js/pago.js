document.addEventListener("DOMContentLoaded", () => {
  // Carga usuario actual
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

  const envioMonto = document.getElementById("envio-monto");
  const totalFinal = document.getElementById("total-final");

  const recojo = document.getElementById("recojo-tienda");
  const envioDomicilio = document.getElementById("envio-domicilio");

  function actualizarTotal() {
    let total = subtotal - descuentos;
    if (recojo.checked) {
      envioMonto.textContent = "0.00";
    } else if (envioDomicilio.checked) {
      envioMonto.textContent = "10.00";
      total += 10;
    }
    totalFinal.textContent = total.toFixed(2);
  }

  recojo.addEventListener("change", actualizarTotal);
  envioDomicilio.addEventListener("change", actualizarTotal);

  actualizarTotal();

  const finalizar = document.querySelector(".btn-finalizar-compra");
  finalizar.addEventListener("click", () => {
    alert("¡Compra finalizada exitosamente!");
    // Aquí puedes limpiar localStorage, etc.
  });
});
