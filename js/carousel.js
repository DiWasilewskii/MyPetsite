const container = document.querySelector('.carousel-container');

if (container) {
  const track = container.querySelector('.carousel-track');
  const prevBtn = container.querySelector('.carousel-btn.left');
  const nextBtn = container.querySelector('.carousel-btn.right');
  const filterBtns = document.querySelectorAll('.portfolio-filters .filter-btn');

  const visible = 3;
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

  const clampIndex = () => {
    const maxIndex = Math.max(items.length - visible, 0);
    if (index > maxIndex) index = maxIndex;
    if (index < 0) index = 0;
  };

  const syncNavState = () => {
    const maxIndex = Math.max(items.length - visible, 0);
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
    if (index < items.length - visible) {
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

  window.addEventListener('resize', update);
  applyFilter('web-dev');
}
