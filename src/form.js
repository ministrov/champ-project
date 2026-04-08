export function initFormValidation() {
  const form = document.querySelector('.footer__form');
  let name = form.querySelector('input[name="user-name"]').value;
  let phone = form.querySelector('input[name="user-phone"]').value;
  let email = form.querySelector('input[name="user-email"]').value;
  const inputField = form.querySelector('.footer-form__field');

  const errorMessageBox = document.createElement('div');
  errorMessageBox.classList.add('footer-form__error-message');
  inputField.append(errorMessageBox);


  form.addEventListener('submit', (e) => {
    let hasError = false;
    let errorMessage = '';

    if (name === '') {
      hasError = true;
      errorMessage += 'Заполните поле "Имя"\n';
      errorMessageBox.textContent = errorMessage;
    }

     if (phone === '') {
      hasError = true;
      errorMessage += 'Заполните поле "Телефон"\n';
      errorMessageBox.textContent = errorMessage;
    }

    if (email === '') {
      hasError = true;
      errorMessage += 'Заполните поле "Почта"\n';
      errorMessageBox.textContent = errorMessage;
    }

    if (email !== '' && (!email.includes('@') || !email.includes('.'))) {
      hasError = true;
      errorMessage += 'Введите корректный email (должен содержать @ и точку)\n';
      errorMessageBox.textContent = errorMessage;
    }

    // Если есть ошибки - отменяем отправку
    if (hasError) {
      e.preventDefault();
      // eslint-disable-next-line no-alert
      alert(errorMessage);
    }
    // eslint-disable-next-line no-console
    console.log('form submitted');
  });

  name = '';
  phone = '';
  email = '';
}