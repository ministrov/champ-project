import { initMenu } from './burger-menu';
import { initFormValidation } from './form';
import { initAboutParalax } from './about-paralax';

document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initFormValidation();
  initAboutParalax();
});
