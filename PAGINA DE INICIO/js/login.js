// Espera a que toda la página cargue completamente
document.addEventListener("DOMContentLoaded", () => {

  // Selecciona el formulario de login
  const loginForm = document.querySelector(".login-box form");

  // Botón de iniciar sesión
  const loginBtn = document.querySelector(".btn-login");

  // Botón de crear cuenta
  const crearCuentaBtn = document.querySelector(".btn-crear-cuenta");

  // Evento: clic en iniciar sesión
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Evita envío por defecto

    // Obtiene los valores ingresados
    const email = loginForm.querySelector('input[type="email"]').value.trim();
    const clave = loginForm.querySelector('input[type="password"]').value.trim();

    // Valida campos vacíos
    if (email === "" || clave === "") {
      Swal.fire("Campos incompletos", "Por favor, completa todos los campos.", "warning");
      return;
    }

    // Valida formato email
    if (!validateEmail(email)) {
      Swal.fire("Correo inválido", "Ingresa un correo válido.", "error");
      return;
    }



    // Guarda el usuario activo en localStorage
    localStorage.setItem("usuarioActivo", JSON.stringify({ email }));

    // Muestra mensaje de éxito
    Swal.fire({
      icon: "success",
      title: "¡Bienvenido!",
      text: "Serás redirigido a la página principal...",
      showConfirmButton: false,
      timer: 2000
    });

    // Limpia formulario
    loginForm.reset();

    // Redirige a principal.html
    setTimeout(() => {
      window.location.href = "principal.html";
    }, 2000);
  });

  // Evento: clic en crear cuenta
  crearCuentaBtn.addEventListener("click", () => {
    // Redirige a registro
    window.location.href = "registrarse.html";
  });

  // Función: valida formato de correo
  function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

});
