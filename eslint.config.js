// eslint.config.js
import htmlacademyVanilla from 'eslint-config-htmlacademy/vanilla.js';

/**
 * Helper to convert legacy config to flat config format
 */
function toFlatConfig(legacyConfig) {
  const flatConfig = {};

  if (legacyConfig.env) flatConfig.env = legacyConfig.env;
  if (legacyConfig.globals) flatConfig.globals = legacyConfig.globals;
  if (legacyConfig.settings) flatConfig.settings = legacyConfig.settings;
  if (legacyConfig.plugins) flatConfig.plugins = legacyConfig.plugins;

  // Map parserOptions → languageOptions
  if (legacyConfig.parserOptions) {
    flatConfig.languageOptions = { ...legacyConfig.parserOptions };
  }
  if (legacyConfig.parser) {
    flatConfig.languageOptions.parser = legacyConfig.parser;
  }

  // Include rules
  if (legacyConfig.rules) {
    flatConfig.rules = {
      ...legacyConfig.rules,
      // Override specific rules if needed
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
    };
  }

  return flatConfig;
}

// Export array of flat config objects
export default [toFlatConfig(htmlacademyVanilla)];
