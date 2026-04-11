import { initMenu } from './burger-menu';
import { initFormValidation } from './form';
import AOS from 'aos';

function initializeApp() {
  AOS.init({
    duration: 700,
    easing: 'ease-in-out',
  });

  initMenu();
  initFormValidation();
}

document.addEventListener('DOMContentLoaded', initializeApp);
