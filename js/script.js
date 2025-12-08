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

// Контактне модальне вікно
(function() {
  const fab = document.getElementById("contactFab");
  const modal = document.getElementById("contactModal");
  const closeBtn = document.getElementById("contactClose");

  if (!fab || !modal || !closeBtn) return;

  const openModal = () => {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  };

  fab.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
})();