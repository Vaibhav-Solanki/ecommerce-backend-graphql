import winston from 'winston'

const logger = process.env.NODE_ENV === 'local'
  ? console
  : winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.Console()]
  })
export default logger
