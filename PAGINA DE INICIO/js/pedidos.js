document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("pedidos-lista");
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

  if (pedidos.length === 0) {
    lista.innerHTML = "<p>No tienes pedidos registrados.</p>";
    return;
  }

  pedidos.forEach(pedido => {
    const card = document.createElement("div");
    card.className = "pedido-card";

    card.innerHTML = `
      <h3>Pedido #${pedido.numeroPedido}</h3>
      <p><strong>Fecha:</strong> ${pedido.fecha}</p>
      <p><strong>Monto facturado:</strong> S/ ${Number(pedido.monto).toFixed(2)}</p>
      <p><strong>Productos:</strong></p>
      <ul class="pedido-items">
        ${pedido.carrito.map(item => `
          <li>${item.nombre} x ${item.cantidad} — S/ ${(item.precio * item.cantidad).toFixed(2)}</li>
        `).join("")}
      </ul>
    `;

    lista.appendChild(card);
  });
});