
const { NODE_ENV } = process.env;

exports.centralErrors = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.isOperational ? err.message : 'Internal Server Error';

    if (NODE_ENV === 'development') {
        return res.status(err.statusCode).json({
            success: false,
            status: err.statusCode,
            message: err.message,
            error: err,
            stack: err.stack,
        });
    }
    else
        if (NODE_ENV === 'production') {
            return res.status(err.statusCode).json({
                success: false,
                status: err.statusCode,
                message: err.message,
            });
        }
     
        else {
            return res.status(err.statusCode).json({
                success: false,
                status: err.statusCode,
                message: err.message,
            });
        }

}