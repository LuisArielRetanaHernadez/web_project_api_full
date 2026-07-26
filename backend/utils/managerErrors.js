class BaseError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

class NotFoundError extends BaseError {
    constructor(message = 'Resource not found', statusCode = 404) {
        super(message, statusCode);
    }
}

class UnauthorizedError extends BaseError {
    constructor(message = 'Unauthorized', statusCode = 401) {
        super(message, statusCode);
    }
}

class ForbiddenError extends BaseError {
    constructor(message = 'Forbidden', statusCode = 403) {
        super(message, statusCode);
    }
}

class BadRequestError extends BaseError {
    constructor(message = 'Bad Request', statusCode = 400) {
        super(message, statusCode);
    }
}

class InternalServerError extends BaseError {
    constructor(message = 'Internal Server Error', statusCode = 500) {
        super(message, statusCode);
        this.isOperational = false;
    }
}

module.exports = {
    BaseError,
    NotFoundError,
    UnauthorizedError,
    ForbiddenError,
    BadRequestError,
    InternalServerError
};