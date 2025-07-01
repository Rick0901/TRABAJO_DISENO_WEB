// Espera a que todo el contenido del DOM esté cargado antes de ejecutar el script
document.addEventListener("DOMContentLoaded", () => {

  // Selecciona el formulario de registro (lado izquierdo)
  const registroForm = document.querySelector(".registro-left form");

  // Selecciona el botón de REGISTRARSE
  const registroBtn = document.querySelector(".btn-registrarse");

  // Selecciona el checkbox de términos y condiciones
  const terminosCheck = document.querySelector(".terminos");

  // Evento click para cuando se presiona el botón de REGISTRARSE
  registroBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Evita que el formulario se envíe por defecto

    // Obtiene los valores de cada campo del formulario
    const nombre = registroForm.querySelector('input[placeholder="MARCIANO"]').value.trim();
    const apellido = registroForm.querySelector('input[placeholder="TERRICOLA"]').value.trim();
    const email = registroForm.querySelector('input[type="email"]').value.trim();
    const telefono = registroForm.querySelector('input[placeholder="999888777"]').value.trim();
    const direccion = registroForm.querySelector('input[placeholder="av.marte 001. urb vía láctea"]').value.trim();
    const dni = registroForm.querySelector('input[placeholder="12345678"]').value.trim();
    const clave = registroForm.querySelector('input[type="password"]').value.trim();

    // Verifica que ningún campo esté vacío
    if ([nombre, apellido, email, telefono, direccion, dni, clave].includes("")) {
      Swal.fire("Campos incompletos", "Completa todos los campos.", "warning");
      return; // Detiene la ejecución si falta algún dato
    }

    // Verifica que se haya aceptado los términos y condiciones
    if (!terminosCheck.checked) {
      Swal.fire("Aviso", "Debes aceptar los términos y condiciones.", "warning");
      return; // Detiene la ejecución si no están aceptados
    }

    // Verifica que el correo tenga formato válido
    if (!validateEmail(email)) {
      Swal.fire("Correo inválido", "Ingresa un correo válido.", "error");
      return; // Detiene si el correo no pasa la validación
    }

    // Verifica que el teléfono sea numérico y tenga una longitud adecuada
    if (isNaN(telefono) || telefono.length < 7) {
      Swal.fire("Teléfono inválido", "Debe ser numérico.", "error");
      return; // Detiene si el teléfono no es válido
    }

    // Verifica que el DNI sea numérico y tenga al menos 8 dígitos
    if (isNaN(dni) || dni.length < 8) {
      Swal.fire("DNI inválido", "Debe ser numérico.", "error");
      return; // Detiene si el DNI no es válido
    }

    // Obtiene la lista de usuarios guardados en localStorage o crea una nueva lista si no hay nada guardado
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verifica si ya existe un usuario registrado con el mismo correo
    const existe = usuarios.find(user => user.email === email);

    if (existe) {
      Swal.fire("Registro duplicado", "Este correo ya está registrado.", "error");
      return; // Detiene si ya existe el usuario
    }

    // Si pasa todas las validaciones, crea el objeto usuario con sus datos
    const nuevoUsuario = { nombre, apellido, email, telefono, direccion, dni, clave };

    // Agrega el nuevo usuario a la lista
    usuarios.push(nuevoUsuario);

    // Guarda la lista actualizada en localStorage como JSON
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Muestra alerta de éxito usando SweetAlert2
    Swal.fire({
      icon: "success",
      title: "¡Registro exitoso!",
      text: `Bienvenido(a), ${nombre}. Redirigiendo...`,
      showConfirmButton: false,
      timer: 2500 // Tiempo antes de redirigir
    });

    // Limpia el formulario después de registrar
    registroForm.reset();

    // Redirige a la página principal después de 2.5 segundos
    setTimeout(() => {
      window.location.href = "principal.html"; // Cambia aquí si tu página de inicio es otra
    }, 2500);
  });

  // Función para validar que el email tenga el formato correcto usando expresión regular
  function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
});
