"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = function (error, req, res, next) {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "Error";
    if (process.env.NODE_ENV === "Development") {
        res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
            stack: error.stack
        });
    }
    else {
        res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
        });
    }
};
exports.default = errorHandler;
