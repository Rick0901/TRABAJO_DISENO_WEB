// preguntas.js actualizado

document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".faq-sidebar li");
  const groups = document.querySelectorAll(".faq-group");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      // Quitar clase activa a todos
      tabs.forEach(t => t.classList.remove("active"));
      // Agregar clase activa al actual
      tab.classList.add("active");

      const target = tab.getAttribute("data-target");
      groups.forEach(group => {
        if (group.id === target) {
          group.style.display = "block";
        } else {
          group.style.display = "none";
        }
      });
    });
  });

  // Mostrar el primero por defecto
  if (tabs.length > 0) {
    tabs[0].click();
  }
});
