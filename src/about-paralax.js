// /* eslint-disable no-console */
// export function initAboutParalax() {
//   const cards = document.querySelectorAll('.about__item');
//   const section = document.querySelector('.about');

//   if (!section || cards.length === 0) return;

//   let ticking = false;

//   // Сохраняем исходные трансформации
//   const originalTransforms = Array.from(cards).map(card => {
//     const style = window.getComputedStyle(card);
//     return style.transform === 'none' ? '' : style.transform;
//   });

//   const getProgress = () => {
//     const rect = section.getBoundingClientRect();
//     const viewportHeight = window.innerHeight;

//     // Более простая и эффективная формула
//     // Когда секция только начинает появляться снизу: progress ≈ 0
//     // Когда секция по центру viewport: progress ≈ 0.5
//     // Когда секция полностью проскроллена: progress ≈ 1
//     const sectionTop = rect.top;
//     const sectionHeight = rect.height;

//     // Видимая часть секции
//     const visibleStart = -sectionHeight;
//     const visibleEnd = viewportHeight;

//     const progress = (sectionTop - visibleEnd) / (visibleStart - visibleEnd);

//     return Math.min(Math.max(progress, 0), 1);
//   };

//   const updateParallax = () => {
//     const progress = getProgress();
//     const maxOffset = 50; // Увеличили до 50px для заметного эффекта

//     // Правильная формула для противоположного направления:
//     // При progress = 0 (секция внизу) -> offset = maxOffset/2 (карточки внизу)
//     // При progress = 1 (секция вверху) -> offset = -maxOffset/2 (карточки вверху)
//     // При progress = 0.5 (секция по центру) -> offset = 0
//     const baseOffset = (0.5 - progress) * maxOffset;

//     cards.forEach((card, index) => {
//       // Разная интенсивность для волнообразного эффекта
//       const intensity = [0.8, 1.0, 1.2][index % 3];
//       const cardOffset = baseOffset * intensity;

//       const originalTransform = originalTransforms[index];

//       // Комбинируем трансформации правильно
//       if (originalTransform) {
//         // Если есть исходная трансформация, добавляем к ней параллакс
//         // Используем translate3d для лучшей производительности
//         card.style.transform = `${originalTransform} translate3d(0, ${cardOffset}px, 0)`;
//       } else {
//         card.style.transform = `translate3d(0, ${cardOffset}px, 0)`;
//       }

//       // Добавляем плавность
//       card.style.transition = 'transform 0.2s ease-out';
//     });

//     // Отладка
//     console.log('Progress:', progress.toFixed(2), 'Base offset:', baseOffset.toFixed(1), 'px');

//     ticking = false;
//   };

//   const onScroll = () => {
//     if (!ticking) {
//       requestAnimationFrame(updateParallax);
//       ticking = true;
//     }
//   };

//   window.addEventListener('scroll', onScroll, { passive: true });
//   window.addEventListener('resize', () => {
//     requestAnimationFrame(updateParallax);
//   });

//   updateParallax();
// }
