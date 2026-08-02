const winston = require('winston');
const expressWinston = require('express-winston');

const requestLogger = expressWinston.logger({
    transports: [
        new winston.transports.File({ filename: 'logs/request.log' }),
    ],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
    ),
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}}',
    expressFormat: true,
    colorize: false,

});

const errorLogger = expressWinston.errorLogger({
    transports: [
        new winston.transports.File({ filename: 'logs/error.log' }),
    ],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
    ),
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}}',
    expressFormat: true,
    colorize: false,
});

module.exports = { requestLogger, errorLogger };

// const logger = expressWinston.logger({
//   transports: [
//     new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
//     new winston.transports.File({ filename: 'logs/combined.log' }),
//     ],
//     format: winston.format.combine(
//         winston.format.timestamp(),
//         winston.format.json(),
//     ),
//     meta: true,
//     msg: 'HTTP {{req.method}} {{req.url}}',
//     expressFormat: true,
//     colorize: false,
// });