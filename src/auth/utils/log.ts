import * as winston from 'winston'
import BrowserConsole from 'winston-transport-browserconsole'

import { getEnv } from '../../utils'

const level = getEnv('AUTH_LOGGER_LOG_LEVEL') || 'error'

winston.configure({
  transports: [
    new BrowserConsole({
      format: winston.format.simple(),
      level,
    }),
  ],
})

export const log = {
  debug: (message: unknown) => winston.debug('DEBUG:AUTH:', message),
  info: (message: unknown) => winston.debug('INFO:AUTH:', message),
  warn: (message: unknown) => winston.debug('WARN:AUTH:', message),
  error: (message: unknown) => winston.debug('ERROR:AUTH:', message),
}
