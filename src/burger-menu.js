export function initMenu() {
  const burger = document.querySelector('.header__burger');
  const menu = document.querySelector('.mobile-menu');
  const beginButton = document.querySelector('.header__begin');

  const overlay = document.createElement('div');
  overlay.classList.add('page__overlay');
  document.body.appendChild(overlay);

  beginButton.addEventListener('click', () => {
    const useElement = burger.querySelector('use');
    closeMenu();

    useElement.setAttribute('href', '/sprite/sprite.svg#burger');
  });

  function openMenu() {
    menu.classList.add('mobile-menu--open');
    overlay.classList.add('page__overlay--open');
    burger.classList.add('mobile-menu--open');
    burger.setAttribute('aria-label', 'Закрыть меню');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('mobile-menu--open');
    overlay.classList.remove('page__overlay--open');
    burger.classList.remove('mobile-menu--open');
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

  overlay.addEventListener('click', (e) => {
    const useElement = burger.querySelector('use');

    if (e.target === overlay) {
      closeMenu();
      useElement.setAttribute('href', '/sprite/sprite.svg#burger');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('mobile-menu--open')) {
      closeMenu();
    }
  });


  function updateIcon() {
    const useElement = burger.querySelector('use');

    if (!useElement) return;

    if (burger.classList.contains('mobile-menu--open')) {
      useElement.setAttribute('href', '/sprite/sprite.svg#close');
    } else {
      useElement.setAttribute('href', '/sprite/sprite.svg#burger');
    }
  }

  burger.addEventListener('click', updateIcon);
}
