const { createLogger, format, transports } = require('winston')

const logConfiguration = {
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(
        format.label({
          label: `System Info - ℹ️ `,
        }),
        format.timestamp({
          format: 'MMM-DD-YYYY HH:mm:ss',
        }),
        format.printf(
          (info) =>
            `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`
        )
      ),
    }),
    new transports.File({
      level: 'error',
      filename: './Services/Logger/Logs/serverError.log',
      format: format.combine(
        format.label({
          label: `Error - ❌ `,
        }),
        format.timestamp({
          format: 'MMM-DD-YYYY HH:mm:ss',
        }),
        format.printf(
          (info) =>
            `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`
        )
      ),
    }),
  ],
}

module.exports = createLogger(logConfiguration)
