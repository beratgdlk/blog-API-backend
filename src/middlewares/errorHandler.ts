import { Request, Response, NextFunction } from 'express';
import { ERROR_MESSAGES } from '../constants/messages.js';

interface ErrorResponse {
    message: string;
    error?: string;
    stack?: string;
}

/**
 * Global error handler middleware
 * Catches and formats all unhandled errors
 */
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Global error handler:', err);
    
    // Set appropriate status code
    const statusCode = err.statusCode || 500;
    
    // Prepare error response
    const errorResponse: ErrorResponse = {
        message: err.message || ERROR_MESSAGES.SERVER_ERROR,
    };
    
    // Add stack trace in development mode
    if (process.env.NODE_ENV !== 'production') {
        errorResponse.error = err.message;
        errorResponse.stack = err.stack;
    }
    
    res.status(statusCode).json(errorResponse);
}; 