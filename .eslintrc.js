module.exports = {
  extends: ['@ztolley/eslint-config-typescript'],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  rules: {
    'react/jsx-wrap-multilines': 0,
  },
}
