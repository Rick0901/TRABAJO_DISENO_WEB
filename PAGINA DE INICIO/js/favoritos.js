// FUNCIONES FAVORITOS
document.addEventListener('DOMContentLoaded', () => {
  const btnFavoritos = document.querySelectorAll('.favorite-btn');

  // Cambiar estado del botón si ya está en favoritos
  btnFavoritos.forEach(btn => {
    const id = btn.dataset.id;
    if (productoYaEnFavoritos(id)) {
      btn.textContent = '💔 Quitar de Favoritos';
    }

    btn.addEventListener('click', () => {
      const producto = {
        id: btn.dataset.id,
        nombre: btn.dataset.nombre,
        imagen: btn.dataset.imagen,
        precio: btn.dataset.precio
      };

      if (productoYaEnFavoritos(producto.id)) {
        quitarDeFavoritos(producto.id);
        btn.textContent = '❤️ Agregar a Favoritos';
      } else {
        agregarAFavoritos(producto);
        btn.textContent = '💔 Quitar de Favoritos';
      }
    });
  });

  // Mostrar productos si estamos en favoritos.html
  if (document.body.classList.contains('pagina-favoritos')) {
    mostrarFavoritos();
  }
});

function productoYaEnFavoritos(id) {
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  return favoritos.some(p => p.id === id);
}

function agregarAFavoritos(producto) {
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  favoritos.push(producto);
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
}

function quitarDeFavoritos(id) {
  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  favoritos = favoritos.filter(p => p.id !== id);
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
  if (document.body.classList.contains('pagina-favoritos')) {
    mostrarFavoritos(); // refrescar vista
  }
}

// MOSTRAR FAVORITOS EN FAVORITOS.HTML
function mostrarFavoritos() {
  const contenedor = document.getElementById('lista-favoritos');
  contenedor.innerHTML = '';
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

  if (favoritos.length === 0) {
    contenedor.innerHTML = '<p>No tienes productos en favoritos.</p>';
    return;
  }

  favoritos.forEach(producto => {
    const div = document.createElement('div');
    div.classList.add('favorito-item');

    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <div class="info">
        <p class="nombre">${producto.nombre}</p>
        <p class="precio">S/ ${producto.precio}</p>
      </div>
      <div class="acciones">
        <div class="cantidad-control">
          <button class="decrease">-</button>
          <input type="number" value="1" min="1" class="cantidad-input">
          <button class="increase">+</button>
        </div>
        <button class="btn-carrito">Agregar al carrito</button>
      </div>
    `;

    // Eventos cantidad y carrito
    const input = div.querySelector('.cantidad-input');
    const btnAdd = div.querySelector('.btn-carrito');
    const decrease = div.querySelector('.decrease');
    const increase = div.querySelector('.increase');

    decrease.addEventListener('click', () => {
      let val = parseInt(input.value);
      if (val > 1) {
        input.value = val - 1;
      } else {
        quitarDeFavoritos(producto.id);
      }
    });

    increase.addEventListener('click', () => {
      input.value = parseInt(input.value) + 1;
    });

    btnAdd.addEventListener('click', () => {
      const cantidad = parseInt(input.value);
      agregarAlCarrito(producto, cantidad);
    });

    contenedor.appendChild(div);
  });
}

// SIMULACIÓN DE AGREGAR AL CARRITO
function agregarAlCarrito(producto, cantidad) {
  console.log(`Agregado al carrito: ${producto.nombre} x ${cantidad}`);
  // Aquí podrías usar localStorage o enviar al servidor según tu lógica
}
