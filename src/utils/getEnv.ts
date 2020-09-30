export const getEnv = (key: string, defaultValue = ''): string => {
  // eslint-disable-next-line no-underscore-dangle
  return window._env_[key] || defaultValue
}
