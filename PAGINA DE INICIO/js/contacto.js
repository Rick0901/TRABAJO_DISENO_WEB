function validarFormulario() {
  const form = document.getElementById("contactForm");
  const nombre = form.nombre.value.trim();
  const apellidos = form.apellidos.value.trim();
  const correo = form.correo.value.trim();
  const pais = form.pais.value;
  const estado = form.estado.value.trim();
  const captcha = form.captcha.checked;

  if (!nombre || !apellidos || !correo || !pais || !estado) {
    alert("Por favor completa todos los campos.");
    return false;
  }

  const correoRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!correoRegex.test(correo)) {
    alert("Por favor ingresa un correo electrónico válido.");
    return false;
  }

  if (!captcha) {
    alert("Por favor confirma que no eres un robot.");
    return false;
  }

  alert("¡Gracias! Tu mensaje ha sido enviado correctamente.");
  form.reset();
  return false; // Para evitar recarga
}

document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("captcha");
  const checkmark = document.querySelector(".checkmark");

  checkbox.addEventListener("click", (e) => {
    e.preventDefault(); // No cambia automáticamente

    if (checkmark.classList.contains("verificado")) return;

    // Animar giro
    checkmark.classList.add("animar");

    setTimeout(() => {
      checkmark.classList.remove("animar");
      checkmark.classList.add("verificado");

      checkbox.checked = true; // Ahora sí lo marcamos
    }, 500);
  });
});