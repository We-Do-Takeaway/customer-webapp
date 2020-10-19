import get from 'lodash/get'

export const getEnv = (key: string, defaultValue = ''): string => {
  // eslint-disable-next-line no-underscore-dangle
  return get(window, `_env_.${key}`, defaultValue)
}
