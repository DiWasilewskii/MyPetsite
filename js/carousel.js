const container = document.querySelector('.carousel-container');

if (container) {
  const track = container.querySelector('.carousel-track');
  const prevBtn = container.querySelector('.carousel-btn.left');
  const nextBtn = container.querySelector('.carousel-btn.right');
  const filterBtns = document.querySelectorAll('.portfolio-filters .filter-btn');

  let items = [];
  let index = 0;

  const collectItems = () => {
    items = Array.from(track.querySelectorAll('.portfolio-item')).filter(
      (item) => item.style.display !== 'none'
    );
  };

  const stepSize = () => {
    const firstVisible = items.find((item) => item.style.display !== 'none');
    if (!firstVisible) return 0;
    const itemW = firstVisible.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    return itemW + gap;
  };

  const visibleCount = () => {
    const size = stepSize();
    if (!size) return 1;
    const containerWidth = container.getBoundingClientRect().width;
    return Math.max(1, Math.round(containerWidth / size));
  };

  const clampIndex = () => {
    const maxIndex = Math.max(items.length - visibleCount(), 0);
    if (index > maxIndex) index = maxIndex;
    if (index < 0) index = 0;
  };

  const syncNavState = () => {
    const maxIndex = Math.max(items.length - visibleCount(), 0);
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index >= maxIndex;
  };

  const update = () => {
    collectItems();
    clampIndex();
    const size = stepSize();
    if (!size) {
      track.style.transform = 'translateX(0)';
      syncNavState();
      return;
    }
    track.style.transform = `translateX(${-index * size}px)`;
    syncNavState();
  };

  const nextSlide = () => {
    collectItems();
    if (index < items.length - visibleCount()) {
      index += 1;
      update();
    }
  };

  const prevSlide = () => {
    collectItems();
    if (index > 0) {
      index -= 1;
      update();
    }
  };

  const applyFilter = (category) => {
    Array.from(track.querySelectorAll('.portfolio-item')).forEach((item) => {
      const match = category === 'all' || item.dataset.category === category;
      item.style.display = match ? '' : 'none';
    });
    index = 0;
    update();
  };

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      applyFilter(btn.dataset.filter);
    });
  });

  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  track.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault();
      e.deltaY > 0 || e.deltaX > 0 ? nextSlide() : prevSlide();
    },
    { passive: false }
  );

  // Swipe support for touch devices
  let startX = 0;
  let startY = 0;
  let isSwiping = false;

  const onTouchStart = (e) => {
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    isSwiping = false;
  };

  const onTouchMove = (e) => {
    if (!e.touches.length) return;
    const { clientX, clientY } = e.touches[0];
    const dx = clientX - startX;
    const dy = clientY - startY;

    // Починаємо свайп лише якщо горизонтальний рух більший за вертикальний
    if (!isSwiping && Math.abs(dx) > Math.abs(dy) + 5) {
      isSwiping = true;
    }

    if (isSwiping) {
      e.preventDefault(); // блокуємо вертикальний скрол всередині каруселі
    }
  };

  const onTouchEnd = (e) => {
    if (!isSwiping) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - startX;
    const threshold = 40; // мінімальна відстань для свайпу

    if (Math.abs(dx) > threshold) {
      dx < 0 ? nextSlide() : prevSlide();
    }
    isSwiping = false;
  };

  track.addEventListener('touchstart', onTouchStart, { passive: true });
  track.addEventListener('touchmove', onTouchMove, { passive: false });
  track.addEventListener('touchend', onTouchEnd, { passive: true });

  window.addEventListener('resize', update);
  applyFilter('web-dev');
}
