// Анімація появи при скролі
window.addEventListener("scroll", function() {
  const about = document.querySelector(".about-content");
  const position = about.getBoundingClientRect().top;
  const screenPos = window.innerHeight / 1.2;

  if (position < screenPos) {
    about.classList.add("visible");
  }
});

// Ініціалізація AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  once: true
});



