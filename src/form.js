/* eslint-disable no-console */
export function initFormValidation() {
  const form = document.querySelector('.footer__form');
  const nameField = form.querySelector('.footer-form__field input[name="user-name"]');
  const phoneField = form.querySelector('.footer-form__field input[name="user-phone"]');
  const emailField = form.querySelector('.footer-form__field input[name="user-email"]');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form) {
      console.error('Форма не найдена');
      return;
    }

    const name = form.querySelector('input[name="user-name"]').value;
    const phone = form.querySelector('input[name="user-phone"]').value;
    const email = form.querySelector('input[name="user-email"]').value;
    let hasError = false;

    document.querySelectorAll('.footer-form__error-message').forEach(el => el.remove());

    if (name === '') {
      hasError = true;
      nameField.classList.add('footer-form__input--error');
      const errorEl = document.createElement('div');
      errorEl.classList.add('footer-form__error-message');
      errorEl.textContent = 'Заполните поле "Имя"';
      nameField.parentElement.append(errorEl);
    } else {
      nameField.classList.remove('footer-form__input--error');
      nameField.parentElement.querySelector('.footer-form__error-message').remove();
    }

    if (phone === '') {
      hasError = true;
      phoneField.classList.add('footer-form__input--error');
      const errorEl = document.createElement('div');
      errorEl.classList.add('footer-form__error-message');
      errorEl.textContent = 'Заполните поле "Телефон"\n';
      phoneField.parentElement.append(errorEl);
    } else {
      phoneField.classList.remove('footer-form__input--error');
      phoneField.parentElement.querySelector('.footer-form__error-message').remove();
    }

    if (email === '') {
      hasError = true;
      emailField.classList.add('footer-form__input--error');
      const errorEl = document.createElement('div');
      errorEl.classList.add('footer-form__error-message');
      errorEl.textContent = 'Заполните поле "Почта"\n';
      emailField.parentElement.append(errorEl);
    } else {
      emailField.classList.remove('footer-form__input--error');
      const existingError = emailField.parentElement.querySelector('.footer-form__error-message');
      if (existingError) {
        existingError.remove();
      }
    }

    // Improved email validation with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Email некорректный');
      hasError = true;
      emailField.classList.add('footer-form__input--error');
      const errorEl = document.createElement('div');
      errorEl.classList.add('footer-form__error-message');
      errorEl.textContent = 'Введите корректный email (формат: example@domain.com)\n';
      emailField.parentElement.append(errorEl);
    }

    if (hasError) {
      console.log('Есть ошибки валидации, отправка отменена');
      return;
    }

    if (!hasError) {
      const formData = new FormData(form);

      console.log('Отправляемые данные:', Array.from(formData.entries()));

      fetch('http://echo.htmlacademy.ru/', {
        method: 'POST',
        body: formData
      })
      .then(() => {
        form.reset();
        nameField.classList.remove('footer-form__input--error');
        emailField.classList.remove('footer-form__input--error');
        phoneField.classList.remove('footer-form__input--error');
        console.log('Fetch запрос выполнен (no-cors mode)');
        console.log('Форма сброшена');
      })
      .catch(error => {
        console.error('Ошибка отправки:', error);
      });
    }

    console.log('form submitted');
  });
}