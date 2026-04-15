import { initMenu, destroyMenu } from './burger-menu';
import { initFormValidation } from './form';
import AOS from 'aos';

function initializeApp() {
  AOS.init({
    duration: 700,
    easing: 'ease-in-out',
  });

  function reloadMenu() {
    destroyMenu();
    initMenu();
  }

  reloadMenu();
  initFormValidation();
}

document.addEventListener('DOMContentLoaded', initializeApp);
