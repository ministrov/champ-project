
export function initAboutParalax() {
  const cards = document.querySelectorAll('.about__item');
  const section = document.querySelector('.about');

  if (!section || !cards) return;

  let ticking = false;
  const lastScrollY = window.scrollY;

  const getProgress = () => {
    const sectionRect = section.getBoundingClientRect();
    const sectionTop = sectionRect.top + window.scrollY;
    const sectionBottom = sectionRect.bottom + window.scrollY;
    const viewportHeight = window.innerHeight;
    // Прогресс скролла от 0 до 1 в пределах секции
    const scrollY = window.scrollY;
    const progress = (scrollY - sectionTop + viewportHeight) / (sectionBottom - sectionTop + viewportHeight);
    return Math.min(Math.max(progress, 0), 1);
  };

  const updateParallax = () => {
    const progress = getProgress();
    const maxOffset = 120; // Максимальное смещение в px (вверх/вниз)
    // Вычисляем направление: при скролле вниз (progress увеличивается) карточки смещаются вверх
    // При скролле вверх (progress уменьшается) карточки смещаются вниз
    const offset = (1 - progress) * maxOffset - (maxOffset / 2);
    cards.forEach((card, index) => {
      // Разная интенсивность смещения для каждой карточки
      const intensity = [1, 0.6, 1.2][index % 3];
      const cardOffset = offset * intensity;
      card.style.transform = `translateY(${cardOffset}px)`;
    });

    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll);
  window.addEventListener('resize', () => {
    requestAnimationFrame(updateParallax);
  });

  // Инициализация
  updateParallax();
  // eslint-disable-next-line no-console
  console.log(ticking, lastScrollY, getProgress());
}
