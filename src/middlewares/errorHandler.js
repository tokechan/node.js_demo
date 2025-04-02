"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const httpStatusCodes_1 = require("../constants/httpStatusCodes");
const errorMessages_1 = require("../controllers/errorMessages");
const errorHandler = (err, req, res, next) => {
    console.error('[Global Error]', err);
    res.status(httpStatusCodes_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        error: errorMessages_1.errorMessages.FAILED_TO_FETCH_TODOS,
        details: err.message
    });
};
exports.errorHandler = errorHandler;
