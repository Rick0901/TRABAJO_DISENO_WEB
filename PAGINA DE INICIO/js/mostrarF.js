document.addEventListener("DOMContentLoaded", function () {
    const contenedor = document.getElementById("favoritos-list");
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    function renderFavoritos() {
        contenedor.innerHTML = "";

        if (favoritos.length === 0) {
            contenedor.innerHTML = "<p>No tienes productos favoritos aún.</p>";
            return;
        }

        favoritos.forEach(producto => {
            const card = document.createElement("div");
            card.classList.add("producto-card");

            card.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" />
                <h3>${producto.nombre}</h3>
                <p>${producto.precio}</p>
                <button class="quitar-fav" data-id="${producto.id}">Eliminar</button>
            `;

            contenedor.appendChild(card);
        });
    }

    contenedor.addEventListener("click", function (e) {
        if (e.target.classList.contains("quitar-fav")) {
            const id = e.target.dataset.id;
            favoritos = favoritos.filter(p => p.id !== id);
            localStorage.setItem("favoritos", JSON.stringify(favoritos));
            renderFavoritos(); // vuelve a renderizar sin recargar
        }
    });

    renderFavoritos(); // primera vez
});
