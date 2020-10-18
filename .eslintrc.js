module.exports = {
  extends: ['@ztolley/eslint-config-typescript'],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  rules: {
    'react/jsx-wrap-multilines': 0,
    'react-hooks/exhaustive-deps': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-use-before-define': 0,
  },
}
