document.addEventListener("DOMContentLoaded", () => {
  // Saludo usuario
  const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
  const saludo = document.getElementById("saludo-envio");
  if (usuarioActual && usuarioActual.nombre) {
    saludo.textContent = `HOLA ${usuarioActual.nombre.toUpperCase()}`;
  }

  // Carga carrito
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
    Swal.fire({
      title: "Procesando pago...",
      text: "No cierre ni recargue la página",
      icon: "info",
      allowOutsideClick: false,
      showConfirmButton: false,
      timer: 2000,
      didOpen: () => {
        Swal.showLoading();
      }
    }).then(() => {
      // Generar número de pedido
      const numeroPedido = Math.floor(Math.random() * 900000) + 100000; // 6 dígitos
      const pedido = {
        numeroPedido,
        fecha: new Date().toLocaleString(),
        monto: totalFinal.textContent,
        carrito
      };

      // Guardar pedido
      let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
      pedidos.push(pedido);
      localStorage.setItem("pedidos", JSON.stringify(pedidos));

      Swal.fire({
        title: "¡Pago exitoso!",
        html: `N° Pedido: <strong>${numeroPedido}</strong><br>Total facturado: S/${pedido.monto}`,
        icon: "success",
        confirmButtonText: "Ver mis pedidos"
      }).then(() => {
        // Limpiar carrito y redirigir
        localStorage.removeItem("carrito");
        window.location.href = "pedidos.html";
      });
    });
  });
});
