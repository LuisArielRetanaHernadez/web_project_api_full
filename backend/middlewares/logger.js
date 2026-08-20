const winston = require('winston');
const expressWinston = require('express-winston');
const { WinstonTransport } = require('@axiomhq/winston');

require('dotenv').config();

// configurar winston con axiom para el modo producción y utilizar winston sin axiom para el modo desarrollador
const NODE_ENV = process.env.NODE_ENV || 'development';

const transports = (filename) => {
    return NODE_ENV === 'production'
        ? [
            new WinstonTransport({
                token: process.env.AXIOM_TOKEN,
                dataset: process.env.AXIOM_DATASET,
                edge: 'eu-central-1.aws.edge.axiom.co',
            }),
        ]
        : [
            new winston.transports.File({ filename }),
        ];
}


const requestLogger = expressWinston.logger({
    level: 'info',
    transports: transports('logs/request.log'),
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
    ),
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}}',
    expressFormat: true,
    colorize: false,

});

const formatError = NODE_ENV === 'production'
    ? winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
    )
    : winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.timestamp(),
        winston.format.json(),
    );

const errorLogger = expressWinston.errorLogger({
    transports: transports('logs/error.log'),
    exceptionHandlers: transports('logs/exceptions.log'),
    rejectionHandlers: transports('logs/rejections.log'),
    format: formatError,
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