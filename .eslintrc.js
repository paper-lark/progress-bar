module.exports = {
  extends: ['eslint:recommended', 'prettier', 'prettier/standard'],
  plugins: ['prettier'],
  env: {
    es6: true,
    browser: true
  },
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'none',
        bracketSpacing: true,
        semi: true
      }
    ],
    'no-console': 'off'
  }
};
