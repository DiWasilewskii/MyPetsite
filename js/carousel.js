const container = document.querySelector('.carousel-container');
const track = container.querySelector('.carousel-track');
const items = Array.from(track.querySelectorAll('.portfolio-item'));
const prevBtn = container.querySelector('.carousel-btn.left');
const nextBtn = container.querySelector('.carousel-btn.right');

let index = 0;
const visible = 3;

function stepSize() {
  const itemW = items[0].getBoundingClientRect().width;
  const gap = parseFloat(getComputedStyle(track).gap) || 0;
  return itemW + gap; // ширина картки + проміжок
}

function update() {
  track.style.transform = `translateX(${-index * stepSize()}px)`;
}

function nextSlide() {
  if (index < items.length - visible) { index++; update(); }
}
function prevSlide() {
  if (index > 0) { index--; update(); }
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Прокрутка колесиком при наведенні
track.addEventListener('wheel', (e) => {
  e.preventDefault();
  (e.deltaY > 0 || e.deltaX > 0) ? nextSlide() : prevSlide();
}, { passive: false });

window.addEventListener('resize', update);
update();
