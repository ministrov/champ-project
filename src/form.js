/* eslint-disable no-console */
export function initFormValidation() {
  const form = document.querySelector('.footer__form');
  let name = form.querySelector('input[name="user-name"]').value;
  let phone = form.querySelector('input[name="user-phone"]').value;
  let email = form.querySelector('input[name="user-email"]').value;
  const nameField = form.querySelector('.footer-form__field > input[name="user-name"]');
  const phoneField = form.querySelector('.footer-form__field > input[name="user-phone"]');
  const emailField = form.querySelector('.footer-form__field > input[name="user-email"]');

  const errorMessageBox = document.createElement('div');
  errorMessageBox.classList.add('footer-form__error-message');

  form.addEventListener('submit', (e) => {
    let hasError = false;
    let errorMessage = '';

    if (name === '') {
      hasError = true;
      errorMessage += 'Заполните поле "Имя"\n';
      errorMessageBox.textContent = errorMessage;
      nameField.append(errorMessageBox);
    }

     if (phone === '') {
      hasError = true;
      errorMessage += 'Заполните поле "Телефон"\n';
      errorMessageBox.textContent = errorMessage;
      phoneField.append(errorMessageBox);
    }

    if (email === '') {
      hasError = true;
      errorMessage += 'Заполните поле "Почта"\n';
      errorMessageBox.textContent = errorMessage;
      emailField.append(errorMessageBox);
    }

    if (email !== '' && (!email.includes('@') || !email.includes('.'))) {
      hasError = true;
      errorMessage += 'Введите корректный email (должен содержать @ и точку)\n';
      errorMessageBox.textContent = errorMessage;
      emailField.append(errorMessageBox);
    }

    // Если есть ошибки - отменяем отправку
    if (hasError) {
      e.preventDefault();
      // eslint-disable-next-line no-alert
      alert(errorMessage);
    }

    console.log('form submitted');
  });

  name = '';
  phone = '';
  email = '';
}