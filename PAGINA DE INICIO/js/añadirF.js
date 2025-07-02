// addToCart.js

document.addEventListener("DOMContentLoaded", () => {
  const btnAddToCart = document.querySelector(".add-to-cart");

  if (btnAddToCart) {
    btnAddToCart.addEventListener("click", () => {
      const nombre = document.querySelector(".product-info h2").textContent.trim();
      const precio = parseFloat(document.querySelector(".product-price").textContent.replace("S/","").trim());
      const imagen = document.querySelector(".product-image img").getAttribute("src");
      const color = document.getElementById("color").value;
      const talla = document.getElementById("talla").value;
      const cantidad = parseInt(document.getElementById("quantity").value);

      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

      const existente = carrito.find(item =>
        item.nombre === nombre &&
        item.color === color &&
        item.talla === talla
      );

      if (existente) {
        existente.cantidad += cantidad;
      } else {
        carrito.push({
          nombre,
          precio,
          imagen,
          color,
          talla,
          cantidad
        });
      }

      localStorage.setItem("carrito", JSON.stringify(carrito));
      alert("Producto agregado al carrito");
      window.location.href = "carrito.html";
    });
  }

  const btnDecrease = document.getElementById("decrease");
  const btnIncrease = document.getElementById("increase");
  const inputQuantity = document.getElementById("quantity");

  if (btnDecrease && btnIncrease && inputQuantity) {
    btnDecrease.addEventListener("click", () => {
      if (parseInt(inputQuantity.value) > 1) {
        inputQuantity.value = parseInt(inputQuantity.value) - 1;
      }
    });

    btnIncrease.addEventListener("click", () => {
      inputQuantity.value = parseInt(inputQuantity.value) + 1;
    });
  }
});
