module.exports = {
  extends: ['@ztolley/eslint-config-typescript'],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
}
