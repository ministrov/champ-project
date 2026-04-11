const SELECTORS = {
  BURGER: '.header__burger',
  MENU: '.mobile-menu',
  BEGIN_BUTTON: '.header__begin',
  USE_ELEMENT: 'use'
};

const CLASSES = {
  MENU_OPEN: 'mobile-menu--open',
  OVERLAY_OPEN: 'page__overlay--open',
  OVERLAY: 'page__overlay'
};

const ARIA_LABELS = {
  CLOSE: 'Закрыть меню',
  OPEN: 'Открыть меню'
};

const SPRITE_PATHS = {
  BURGER: '/sprite/sprite.svg#burger',
  CLOSE: '/sprite/sprite.svg#close'
};

const KEYS = {
  ESCAPE: 'Escape'
};

/**
 * Создает оверлей для меню
 * @returns {HTMLElement} Созданный элемент оверлея
 */
function createOverlay() {
  const overlay = document.createElement('div');
  overlay.classList.add(CLASSES.OVERLAY);
  document.body.appendChild(overlay);
  return overlay;
}

/**
 * Обновляет иконку бургер-меню
 * @param {HTMLElement} burger - Элемент бургер-меню
 * @param {HTMLElement} useElement - SVG use элемент
 */
function updateIcon(burger, useElement) {
  if (!useElement) return;

  const iconPath = burger.classList.contains(CLASSES.MENU_OPEN)
    ? SPRITE_PATHS.CLOSE
    : SPRITE_PATHS.BURGER;

  useElement.setAttribute('href', iconPath);
}

/**
 * Открывает мобильное меню
 * @param {HTMLElement} menu - Элемент меню
 * @param {HTMLElement} overlay - Элемент оверлея
 * @param {HTMLElement} burger - Элемент бургер-меню
 */
function openMenu(menu, overlay, burger) {
  menu.classList.add(CLASSES.MENU_OPEN);
  overlay.classList.add(CLASSES.OVERLAY_OPEN);
  burger.classList.add(CLASSES.MENU_OPEN);
  burger.setAttribute('aria-label', ARIA_LABELS.CLOSE);
  document.body.style.overflow = 'hidden';
}

/**
 * Закрывает мобильное меню
 * @param {HTMLElement} menu - Элемент меню
 * @param {HTMLElement} overlay - Элемент оверлея
 * @param {HTMLElement} burger - Элемент бургер-меню
 * @param {HTMLElement} useElement - SVG use элемент
 */
function closeMenu(menu, overlay, burger, useElement) {
  menu.classList.remove(CLASSES.MENU_OPEN);
  overlay.classList.remove(CLASSES.OVERLAY_OPEN);
  burger.classList.remove(CLASSES.MENU_OPEN);
  burger.setAttribute('aria-label', ARIA_LABELS.OPEN);
  document.body.style.overflow = '';

  if (useElement) {
    useElement.setAttribute('href', SPRITE_PATHS.BURGER);
  }
}

/**
 * Обрабатывает клик по бургер-меню
 * @param {HTMLElement} menu - Элемент меню
 * @param {HTMLElement} overlay - Элемент оверлея
 * @param {HTMLElement} burger - Элемент бургер-меню
 * @param {HTMLElement} useElement - SVG use элемент
 */
function handleBurgerClick(menu, overlay, burger, useElement) {
  if (menu.classList.contains(CLASSES.MENU_OPEN)) {
    closeMenu(menu, overlay, burger, useElement);
  } else {
    openMenu(menu, overlay, burger);
  }
  updateIcon(burger, useElement);
}

/**
 * Обрабатывает клик по оверлею
 * @param {Event} event - Событие клика
 * @param {HTMLElement} overlay - Элемент оверлея
 * @param {HTMLElement} menu - Элемент меню
 * @param {HTMLElement} burger - Элемент бургер-меню
 * @param {HTMLElement} useElement - SVG use элемент
 */
function handleOverlayClick(event, overlay, menu, burger, useElement) {
  if (event.target === overlay) {
    closeMenu(menu, overlay, burger, useElement);
  }
}


/**
 * Обрабатывает нажатие клавиши Escape
 * @param {KeyboardEvent} event - Событие клавиатуры
 * @param {HTMLElement} menu - Элемент меню
 * @param {HTMLElement} overlay - Элемент оверлея
 * @param {HTMLElement} burger - Элемент бургер-меню
 * @param {HTMLElement} useElement - SVG use элемент
 */
function handleKeyDown(event, menu, overlay, burger, useElement) {
  if (event.key === KEYS.ESCAPE && menu.classList.contains(CLASSES.MENU_OPEN)) {
    closeMenu(menu, overlay, burger, useElement);
  }
}

/**
 * Инициализирует мобильное меню
 */
export function initMenu() {
  const burger = document.querySelector(SELECTORS.BURGER);
  const menu = document.querySelector(SELECTORS.MENU);
  const beginButton = document.querySelector(SELECTORS.BEGIN_BUTTON);

  // Проверка существования элементов
  if (!burger || !menu || !beginButton) {
    // eslint-disable-next-line no-console
    console.warn('Не все элементы меню найдены');
    return;
  }

  const overlay = createOverlay();
  const useElement = burger.querySelector(SELECTORS.USE_ELEMENT);

  // Обработчик для кнопки "Начать"
  beginButton.addEventListener('click', () => {
    closeMenu(menu, overlay, burger, useElement);
  });

  // Обработчик для бургер-меню
  burger.addEventListener('click', () => {
    handleBurgerClick(menu, overlay, burger, useElement);
  });

  // Обработчик для оверлея
  overlay.addEventListener('click', (event) => {
    handleOverlayClick(event, overlay, menu, burger, useElement);
  });

  // Обработчик для клавиши Escape
  document.addEventListener('keydown', (event) => {
    handleKeyDown(event, menu, overlay, burger, useElement);
  });
}

// export function initMenu() {
//   const burger = document.querySelector('.header__burger');
//   const menu = document.querySelector('.mobile-menu');
//   const beginButton = document.querySelector('.header__begin');

//   const overlay = document.createElement('div');
//   overlay.classList.add('page__overlay');
//   document.body.appendChild(overlay);

//   beginButton.addEventListener('click', () => {
//     const useElement = burger.querySelector('use');
//     closeMenu();

//     useElement.setAttribute('href', '/sprite/sprite.svg#burger');
//   });

//   function openMenu() {
//     menu.classList.add('mobile-menu--open');
//     overlay.classList.add('page__overlay--open');
//     burger.classList.add('mobile-menu--open');
//     burger.setAttribute('aria-label', 'Закрыть меню');
//     document.body.style.overflow = 'hidden';
//   }

//   function closeMenu() {
//     menu.classList.remove('mobile-menu--open');
//     overlay.classList.remove('page__overlay--open');
//     burger.classList.remove('mobile-menu--open');
//     burger.setAttribute('aria-label', 'Открыть меню');
//     document.body.style.overflow = '';
//   }

//   burger.addEventListener('click', () => {
//     if (menu.classList.contains('mobile-menu--open')) {
//       closeMenu();
//     } else {
//       openMenu();
//     }
//   });

//   overlay.addEventListener('click', (e) => {
//     const useElement = burger.querySelector('use');

//     if (e.target === overlay) {
//       closeMenu();
//       useElement.setAttribute('href', '/sprite/sprite.svg#burger');
//     }
//   });

//   document.addEventListener('keydown', (e) => {
//     if (e.key === 'Escape' && menu.classList.contains('mobile-menu--open')) {
//       closeMenu();
//     }
//   });


//   function updateIcon() {
//     const useElement = burger.querySelector('use');

//     if (!useElement) return;

//     if (burger.classList.contains('mobile-menu--open')) {
//       useElement.setAttribute('href', '/sprite/sprite.svg#close');
//     } else {
//       useElement.setAttribute('href', '/sprite/sprite.svg#burger');
//     }
//   }

//   burger.addEventListener('click', updateIcon);
// }
