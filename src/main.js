import { initMenu } from './burger-menu';
import { initFormValidation } from './form';
import AOS from 'aos';

document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 700,
    easing: 'ease-in-out',
  });

  initMenu();
  initFormValidation();
});
