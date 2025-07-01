document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  let currentIndex = 0;

  function showSlide(index) {
    if (index < 0) currentIndex = slides.length - 1;
    else if (index >= slides.length) currentIndex = 0;
    else currentIndex = index;

    slides.forEach((slide, i) => slide.classList.toggle('active', i === currentIndex));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showSlide(i);
    });
  });

  showSlide(currentIndex);
});
