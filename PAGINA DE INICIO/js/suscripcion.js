document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.suscribe form');

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Evita que se recargue la página

    const emailInput = form.querySelector('input[name="email"]');
    const email = emailInput.value.trim();

    if (email === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Correo vacío',
        text: 'Por favor ingresa tu correo electrónico.',
        confirmButtonColor: '#BB8362'
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: '¡Suscripción exitosa!',
      text: `Te hemos suscrito con: ${email}`,
      confirmButtonColor: '#BB8362'
    });

    form.reset();
  });
});
