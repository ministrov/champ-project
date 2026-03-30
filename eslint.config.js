import { defineConfig } from 'eslint/config';
import js from '@eslint/js';

export default defineConfig([
  {
    files: ['**/*.js'],
    plugins: {
      js,
    },
    // extends: ['js/recommended', 'htmlacademy/vanilla'],
    extends: ['htmlacademy/vanilla'],
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
    },
  },
]);
