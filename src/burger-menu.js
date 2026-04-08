export function initMenu() {
  const burger = document.querySelector('.header__burger');
  const menu = document.querySelector('.mobile-menu');

  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  document.body.appendChild(overlay);

  function openMenu() {
    menu.classList.add('mobile-menu--open');
    overlay.classList.add('overlay--open');
    burger.setAttribute('aria-label', 'Закрыть меню');
    document.body.style.overflow = 'hidden'; // Блокируем скролл
  }

  function closeMenu() {
    menu.classList.remove('mobile-menu--open');
    overlay.classList.remove('overlay--open');
    burger.setAttribute('aria-label', 'Открыть меню');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', () => {
    if (menu.classList.contains('mobile-menu--open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

    // Закрытие по клику на оверлей
  overlay.addEventListener('click', closeMenu);

  // Закрытие по нажатию Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('mobile-menu--open')) {
      closeMenu();
    }
  });


  // Опционально: изменение иконки в спрайте
  // Если у вас в спрайте есть отдельные иконки для бургера и крестика
  function updateIcon() {
    const useElement = burger.querySelector('use');

    if (!useElement) return;

    if (burger.classList.contains('mobile-menu--open')) {
      useElement.setAttribute('href', '/sprite/sprite.svg#close');
    } else {
      useElement.setAttribute('href', '/sprite/sprite.svg#burger');
    }
  }

  // Если хотите использовать разные иконки из спрайта, раскомментируйте:
  burger.addEventListener('click', updateIcon);
}
