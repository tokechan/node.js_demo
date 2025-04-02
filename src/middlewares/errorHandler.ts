import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../constants/httpStatusCodes';
import { errorMessages } from '../controllers/errorMessages';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction

) => {
    console.error('[Global Error]', err);

    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ 
        error: errorMessages.FAILED_TO_FETCH_TODOS,
        details: err.message
    });
};