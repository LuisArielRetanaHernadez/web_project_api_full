module.exports = {
  extends: [
    'eslint-config-airbnb',
  ],
  rules: {
    'no-console': 'off',
    'no-underscore-dangle': ['error', { 'allow': ['_id'] }],
  }
};
