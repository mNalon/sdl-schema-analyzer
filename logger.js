const debug = require('debug')

const SCHEMA_ANALYSER = 'sdl-schema-analyzer'

const createLogger = (level) => debug(`${SCHEMA_ANALYSER}:${level}`)

module.exports.info = createLogger('info')
module.exports.warn = createLogger('warn')
module.exports.error = createLogger('error')
