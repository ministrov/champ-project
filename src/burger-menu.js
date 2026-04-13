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

let isInitialized = false;
let state = {
  burger: null,
  menu: null,
  beginButton: null,
  overlay: null,
  useElement: null,
  handlers: {
    beginButtonClick: null,
    burgerClick: null,
    overlayClick: null,
    documentKeydown: null
  }
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
 * Удаляет оверлей меню
 * @param {HTMLElement} overlay - Элемент оверлея
 */
function removeOverlay(overlay) {
  if (overlay && overlay.parentNode) {
    overlay.parentNode.removeChild(overlay);
  }
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

function addDocumentKeydownHandler() {
  if (state.handlers.documentKeydown) {
    return;
  }

  const handler = (event) => {
    handleKeyDown(event);
  };

  document.addEventListener('keydown', handler);
  state.handlers.documentKeydown = handler;
}

function removeDocumentKeydownHandler() {
  if (state.handlers.documentKeydown) {
    document.removeEventListener('keydown', state.handlers.documentKeydown);
    state.handlers.documentKeydown = null;
  }
}

function openMenu() {
  state.menu.classList.add(CLASSES.MENU_OPEN);
  state.overlay.classList.add(CLASSES.OVERLAY_OPEN);
  state.burger.classList.add(CLASSES.MENU_OPEN);
  state.burger.setAttribute('aria-label', ARIA_LABELS.CLOSE);
  document.body.style.overflow = 'hidden';

  addDocumentKeydownHandler();
}

function closeMenu() {
  state.menu.classList.remove(CLASSES.MENU_OPEN);
  state.overlay.classList.remove(CLASSES.OVERLAY_OPEN);
  state.burger.classList.remove(CLASSES.MENU_OPEN);
  state.burger.setAttribute('aria-label', ARIA_LABELS.OPEN);
  document.body.style.overflow = '';

  if (state.useElement) {
    state.useElement.setAttribute('href', SPRITE_PATHS.BURGER);
  }

  removeDocumentKeydownHandler();
}

function handleBurgerClick() {
  if (state.menu.classList.contains(CLASSES.MENU_OPEN)) {
    closeMenu();
  } else {
    openMenu();
  }
  updateIcon(state.burger, state.useElement);
}

/**
 * Обрабатывает клик по оверлею
 * @param {Event} event - Событие клика
 */
function handleOverlayClick(event) {
  if (event.target === state.overlay) {
    closeMenu();
  }
}

/**
 * Обрабатывает нажатие клавиши Escape
 * @param {KeyboardEvent} event - Событие клавиатуры
 */
function handleKeyDown(event) {
  if (event.key === KEYS.ESCAPE && state.menu.classList.contains(CLASSES.MENU_OPEN)) {
    closeMenu();
  }
}

export function initMenu() {
  if (isInitialized) {
    return;
  }

  const burger = document.querySelector(SELECTORS.BURGER);
  const menu = document.querySelector(SELECTORS.MENU);
  const beginButton = document.querySelector(SELECTORS.BEGIN_BUTTON);

  if (!burger || !menu || !beginButton) {
    return;
  }

  state.burger = burger;
  state.menu = menu;
  state.beginButton = beginButton;
  state.overlay = createOverlay();
  state.useElement = burger.querySelector(SELECTORS.USE_ELEMENT);

  const beginButtonHandler = () => closeMenu();
  const burgerHandler = () => handleBurgerClick();
  const overlayHandler = (event) => handleOverlayClick(event);

  state.beginButton.addEventListener('click', beginButtonHandler);
  state.burger.addEventListener('click', burgerHandler);
  state.overlay.addEventListener('click', overlayHandler);

  state.handlers.beginButtonClick = beginButtonHandler;
  state.handlers.burgerClick = burgerHandler;
  state.handlers.overlayClick = overlayHandler;

  isInitialized = true;
}

export function destroyMenu() {
  if (!isInitialized) {
    return;
  }

  if (state.beginButton && state.handlers.beginButtonClick) {
    state.beginButton.removeEventListener('click', state.handlers.beginButtonClick);
  }

  if (state.burger && state.handlers.burgerClick) {
    state.burger.removeEventListener('click', state.handlers.burgerClick);
  }

  if (state.overlay && state.handlers.overlayClick) {
    state.overlay.removeEventListener('click', state.handlers.overlayClick);
  }

  removeDocumentKeydownHandler();
  removeOverlay(state.overlay);

  state = {
    burger: null,
    menu: null,
    beginButton: null,
    overlay: null,
    useElement: null,
    handlers: {
      beginButtonClick: null,
      burgerClick: null,
      overlayClick: null,
      documentKeydown: null
    }
  };

  isInitialized = false;
}
