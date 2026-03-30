// eslint.config.js
import globals from 'globals';
import htmlPlugin from 'eslint-plugin-html';

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    rules: {
      // Variables
      'no-unused-vars': 'warn',
      'no-undef': 'warn',

      // Best practices
      'eqeqeq': ['error', 'always'],
      'no-alert': 'warn',
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',

      // Styling
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'no-multi-spaces': 'error',
      'no-trailing-spaces': 'error',
      'space-infix-ops': 'error',
      'keyword-spacing': 'error',
      'space-before-blocks': 'error',

      // ES6+
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
    },
  },
  {
    files: ['**/*.html'],
    plugins: {
      html: htmlPlugin,
    },
    processor: 'html/html',
  },
];
