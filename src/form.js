const SELECTORS = {
  FORM: '.footer__form',
  NAME_INPUT: 'input[name="user-name"]',
  PHONE_INPUT: 'input[name="user-phone"]',
  EMAIL_INPUT: 'input[name="user-email"]',
  ERROR_MESSAGE: '.footer-form__error-message'
};

const CLASSES = {
  INPUT_ERROR: 'footer-form__input--error',
  ERROR_MESSAGE: 'footer-form__error-message'
};

const ERROR_MESSAGES = {
  NAME_REQUIRED: 'Заполните поле "Имя"',
  PHONE_REQUIRED: 'Заполните поле "Телефон"',
  EMAIL_REQUIRED: 'Введите корректный email (формат: example@domain.com)',
  EMAIL_INVALID: 'Введите корректный email (формат: example@domain.com)'
};

const API_ENDPOINT = 'http://echo.htmlacademy.ru/';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Создает элемент с сообщением об ошибке
 * @param {string} message - Текст сообщения об ошибке
 * @returns {HTMLElement} Созданный элемент ошибки
 */
function createErrorElement(message) {
  const errorEl = document.createElement('div');
  errorEl.classList.add(CLASSES.ERROR_MESSAGE);
  errorEl.textContent = message;
  return errorEl;
}

function clearAllErrors() {
  document.querySelectorAll(SELECTORS.ERROR_MESSAGE).forEach(el => el.remove());
}

/**
 * Валидирует поле формы
 * @param {HTMLElement} field - Поле для валидации
 * @param {string} value - Значение поля
 * @param {string} errorMessage - Сообщение об ошибке
 * @param {Function} [validationFn] - Дополнительная функция валидации
 * @returns {boolean} true если поле валидно, false если есть ошибка
 */
function validateField(field, value, errorMessage, validationFn = null) {
  const hasError = value === '' || (validationFn && !validationFn(value));
  if (hasError) {
    field.classList.add(CLASSES.INPUT_ERROR);
    const errorEl = createErrorElement(errorMessage);
    field.parentElement.append(errorEl);
    return false;
  }
  field.classList.remove(CLASSES.INPUT_ERROR);
  const existingError = field.parentElement.querySelector(SELECTORS.ERROR_MESSAGE);
  if (existingError) {
    existingError.remove();
  }

  return true;
}

/**
 * Валидирует email с помощью регулярного выражения
 * @param {string} email - Email для валидации
 * @returns {boolean} true если email валиден
 */
function validateEmail(email) {
  return EMAIL_REGEX.test(email);
}

/**
 * Отправляет данные формы на сервер
 * @param {HTMLFormElement} form - Форма для отправки
 * @param {HTMLElement} nameField - Поле имени
 * @param {HTMLElement} phoneField - Поле телефона
 * @param {HTMLElement} emailField - Поле email
 */
function submitForm(form, nameField, phoneField, emailField) {
  const formData = new FormData(form);

  fetch(API_ENDPOINT, {
    method: 'POST',
    body: formData
  })
  .then(() => {
    form.reset();
    nameField.classList.remove(CLASSES.INPUT_ERROR);
    emailField.classList.remove(CLASSES.INPUT_ERROR);
    phoneField.classList.remove(CLASSES.INPUT_ERROR);
    clearAllErrors();
  })
  .catch(error => {
    // eslint-disable-next-line no-console
    console.error('Ошибка отправки формы:', error);
  });
}

/**
 * Обрабатывает отправку формы
 * @param {Event} event - Событие отправки формы
 * @param {HTMLFormElement} form - Форма
 * @param {HTMLElement} nameField - Поле имени
 * @param {HTMLElement} phoneField - Поле телефона
 * @param {HTMLElement} emailField - Поле email
 */
function handleFormSubmit(event, form, nameField, phoneField, emailField) {
  event.preventDefault();

  if (!form) {
    return;
  }

  const name = nameField.value;
  const phone = phoneField.value;
  const email = emailField.value;
  let hasError = false;

  clearAllErrors();

  if (!validateField(nameField, name, ERROR_MESSAGES.NAME_REQUIRED)) {
    hasError = true;
  }

  if (!validateField(phoneField, phone, ERROR_MESSAGES.PHONE_REQUIRED)) {
    hasError = true;
  }

  if (!validateField(emailField, email, ERROR_MESSAGES.EMAIL_REQUIRED)) {
    hasError = true;
  }

  if (email && !validateField(emailField, email, ERROR_MESSAGES.EMAIL_INVALID, validateEmail)) {
    hasError = true;
  }

  if (hasError) {
    return;
  }

  submitForm(form, nameField, phoneField, emailField);
}

export function initFormValidation() {
  const form = document.querySelector(SELECTORS.FORM);

  if (!form) {
    return;
  }

  const nameField = form.querySelector(SELECTORS.NAME_INPUT);
  const phoneField = form.querySelector(SELECTORS.PHONE_INPUT);
  const emailField = form.querySelector(SELECTORS.EMAIL_INPUT);

  if (!nameField || !phoneField || !emailField) {
    return;
  }

  form.addEventListener('submit', (event) => {
    handleFormSubmit(event, form, nameField, phoneField, emailField);
  });
}
