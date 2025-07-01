document.addEventListener("DOMContentLoaded", function () {
    const increaseBtn = document.getElementById("increase");
    const decreaseBtn = document.getElementById("decrease");
    const quantityInput = document.getElementById("quantity");

    increaseBtn.addEventListener("click", () => {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    });

    decreaseBtn.addEventListener("click", () => {
        if (parseInt(quantityInput.value) > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    // Función para inicializar los controles de cantidad
    function initializeQuantityControls() {
        const quantityControls = document.querySelectorAll('.quantity-control');

        quantityControls.forEach(control => {
            const minusButton = control.querySelector('.quantity-button:first-child');
            const plusButton = control.querySelector('.quantity-button:last-child');
            const quantitySpan = control.querySelector('span');

            minusButton.addEventListener('click', () => {
                let currentQuantity = parseInt(quantitySpan.textContent);
                if (currentQuantity > 1) { // Evita que la cantidad baje de 1
                    quantitySpan.textContent = currentQuantity - 1;
                    // Aquí podrías agregar lógica para actualizar el carrito o el total
                    console.log('Cantidad disminuida a:', quantitySpan.textContent);
                }
            });

            plusButton.addEventListener('click', () => {
                let currentQuantity = parseInt(quantitySpan.textContent);
                quantitySpan.textContent = currentQuantity + 1;
                // Aquí podrías agregar lógica para actualizar el carrito o el total
                console.log('Cantidad aumentada a:', quantitySpan.textContent);
            });
        });
    }

    

    // Llama a la función para inicializar los controles cuando el DOM esté cargado
    initializeQuantityControls();

    // Opcional: Para los botones de corazón y papelera, si quieres que hagan algo
    const iconButtons = document.querySelectorAll('.icon-button');
    iconButtons.forEach(button => {
        button.addEventListener('click', () => {
            const iconType = button.querySelector('svg').getAttribute('data-feather');
            const itemContainer = button.closest('.favorite-item');
            const itemName = itemContainer.querySelector('.item-name').textContent;

            if (iconType === 'trash-2') {
                // Lógica para eliminar el elemento
                if (confirm(`¿Estás seguro de que quieres eliminar "${itemName}" de tus favoritos?`)) {
                    itemContainer.remove(); // Elimina el elemento del DOM
                    console.log(`"${itemName}" eliminado.`);
                    // Aquí podrías agregar lógica para actualizar la base de datos o el almacenamiento local
                }
            } else if (iconType === 'heart') {
                // Lógica para quitar/agregar de favoritos (si el corazón es un toggle)
                // Por ahora, solo loguea que se ha hecho clic en el corazón
                console.log(`Clic en el corazón para "${itemName}".`);
                // Podrías cambiar el color del corazón o el ícono para indicar el estado
            }
        });
    });
});
