/* eslint-disable no-console */
export function initFormValidation() {
  const form = document.querySelector('.footer__form');
  const nameField = form.querySelector('.footer-form__field > input[name="user-name"]');
  const phoneField = form.querySelector('.footer-form__field > input[name="user-phone"]');
  const emailField = form.querySelector('.footer-form__field > input[name="user-email"]');

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
      const errorEl = document.createElement('div');
      errorEl.classList.add('footer-form__error-message');
      errorEl.textContent = 'Заполните поле "Имя"';
      nameField.append(errorEl);
    }

     if (phone === '') {
      hasError = true;
      const errorEl = document.createElement('div');
      errorEl.classList.add('footer-form__error-message');
      errorEl.textContent = 'Заполните поле "Телефон"\n';
      phoneField.append(errorEl);
    }

    if (email === '') {
      hasError = true;
      const errorEl = document.createElement('div');
      errorEl.classList.add('footer-form__error-message');
      errorEl.textContent = 'Заполните поле "Почта"\n';
      emailField.append(errorEl);
    }

    if (email !== '' && (!email.includes('@') || !email.includes('.'))) {
      hasError = true;
      const errorEl = document.createElement('div');
      errorEl.classList.add('footer-form__error-message');
      errorEl.textContent = 'Введите корректный email (должен содержать @ и точку)\n';
      emailField.append(errorEl);
    }

    // Если есть ошибки - отменяем отправку
    if (hasError) {
      console.log('Есть ошибки валидации, отправка отменена');
      return;
    }

    if (!hasError) {
      const formData = new FormData(form);

      console.log('Отправляемые данные:', Array.from(formData.entries()));

      fetch('http://echo.htmlacademy.ru/', {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      })
      .then(() => {
         // В режиме no-cors response недоступен
        console.log('Fetch запрос выполнен (no-cors mode)');
        form.reset(); // Теперь это выполнится
        console.log('Форма сброшена');
      })
      .catch(error => {
        console.error('Ошибка отправки:', error);
      });
    }

    console.log('form submitted');
  });
}