module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': 'off',
    'no-underscore-dangle': 'off',
    'eqeqeq': 'off',
    'no-param-reassign': 'off',
    'max-len': 'off',
    'no-restricted-syntax': 'off',
    'no-plusplus': 'off'
  },
};
