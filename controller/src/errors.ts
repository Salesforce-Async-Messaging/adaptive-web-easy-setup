import logger from './logger';

/**
 * Error code enumeration for centralized error handling
 */
export enum ErrorCode {
    // HTTP Errors
    HTTP_ERROR = 'HTTP_ERROR',
    
    // Validation Errors
    VALIDATION_MISSING_MESSAGING_URL = 'VALIDATION_MISSING_MESSAGING_URL',
    VALIDATION_MISSING_ORGANIZATION_ID = 'VALIDATION_MISSING_ORGANIZATION_ID',
    VALIDATION_MISSING_DEPLOYMENT_DEVELOPER_NAME = 'VALIDATION_MISSING_DEPLOYMENT_DEVELOPER_NAME',
    VALIDATION_MISSING_CONVERSATION_ID = 'VALIDATION_MISSING_CONVERSATION_ID',
    VALIDATION_INVALID_EVENT_SOURCE = 'VALIDATION_INVALID_EVENT_SOURCE',
    VALIDATION_INVALID_EVENT_LISTENER_OPERATION = 'VALIDATION_INVALID_EVENT_LISTENER_OPERATION',
    VALIDATION_INVALID_EVENT_NAME = 'VALIDATION_INVALID_EVENT_NAME',
    VALIDATION_INVALID_EVENT_HANDLER = 'VALIDATION_INVALID_EVENT_HANDLER',
    VALIDATION_INVALID_API_PATH = 'VALIDATION_INVALID_API_PATH',
    VALIDATION_INVALID_EVENT_LISTENER_MAP = 'VALIDATION_INVALID_EVENT_LISTENER_MAP',
    VALIDATION_INVALID_SERVER_SENT_EVENT_DATA = 'VALIDATION_INVALID_SERVER_SENT_EVENT_DATA',
    VALIDATION_INVALID_CONVERSATION_ENTRY = 'VALIDATION_INVALID_CONVERSATION_ENTRY',
    VALIDATION_UNSUPPORTED_ENTRY_TYPE = 'VALIDATION_UNSUPPORTED_ENTRY_TYPE',
    VALIDATION_INVALID_RESPONSE_FORMAT = 'VALIDATION_INVALID_RESPONSE_FORMAT',
    
    // Conversation Configuration Errors
    CONVERSATION_WEB_STORAGE_UNAVAILABLE = 'CONVERSATION_WEB_STORAGE_UNAVAILABLE',
    CONVERSATION_ALREADY_OPEN = 'CONVERSATION_ALREADY_OPEN',
    CONVERSATION_NO_ACTIVE_CONVERSATION = 'CONVERSATION_NO_ACTIVE_CONVERSATION',
    CONVERSATION_ID_MISMATCH = 'CONVERSATION_ID_MISMATCH',
    CONVERSATION_FAILED_TO_PARSE_CONVERSATION_ENTRY = 'CONVERSATION_FAILED_TO_PARSE_CONVERSATION_ENTRY',
    CONVERSATION_EVENT_SOURCE_POLYFILL_MISSING = 'CONVERSATION_EVENT_SOURCE_POLYFILL_MISSING',
}

/**
 * Base error class that extends Error
 */
export class BaseError extends Error {
    public readonly code: ErrorCode;
    public readonly timestamp: Date;
    public readonly originalError?: Error | unknown;

    constructor(
        code: ErrorCode,
        message: string,
        originalError?: Error | unknown
    ) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        this.timestamp = new Date();
        this.originalError = originalError;
        
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if ((Error as any).captureStackTrace) {
            (Error as any).captureStackTrace(this, this.constructor);
        }
    }

    /**
     * Convert error to a plain object for logging/serialization
     */
    toJSON(): Record<string, unknown> {
        return {
            name: this.name,
            code: this.code,
            message: this.message,
            timestamp: this.timestamp.toISOString(),
            stack: this.stack,
            originalError: this.originalError instanceof Error 
                ? {
                    name: this.originalError.name,
                    message: this.originalError.message,
                    stack: this.originalError.stack
                }
                : this.originalError
        };
    }
}

/**
 * HTTP error class for API-related errors
 */
export class HttpError extends BaseError {
    public readonly status: number;
    public readonly statusText?: string;

    constructor(
        code: ErrorCode,
        message: string,
        status: number,
        statusText?: string,
        originalError?: Error | unknown
    ) {
        super(code, message, originalError);
        this.status = status;
        this.statusText = statusText;
    }

    toJSON(): Record<string, unknown> {
        return {
            ...super.toJSON(),
            status: this.status,
            statusText: this.statusText
        };
    }
}

/**
 * Validation error class for input validation failures
 */
export class ValidationError extends BaseError {
    constructor(
        code: ErrorCode,
        message: string,
        originalError?: Error | unknown
    ) {
        super(code, message, originalError);
    }
}

/**
 * Conversation configuration error class for conversation and configuration-related errors
 */
export class ConversationConfigurationError extends BaseError {
    public readonly context?: Record<string, unknown>;

    constructor(
        code: ErrorCode,
        message: string,
        context?: Record<string, unknown>,
        originalError?: Error | unknown
    ) {
        super(code, message, originalError);
        this.context = context;
    }

    toJSON(): Record<string, unknown> {
        return {
            ...super.toJSON(),
            context: this.context
        };
    }
}

/**
 * Type guard to check if an error is a BaseError
 */
export function isBaseError(error: unknown): error is BaseError {
    return error instanceof BaseError;
}

/**
 * Type guard to check if an error is an HttpError
 */
export function isHttpError(error: unknown): error is HttpError {
    return error instanceof HttpError;
}

/**
 * Type guard to check if an error is a ValidationError
 */
export function isValidationError(error: unknown): error is ValidationError {
    return error instanceof ValidationError;
}

/**
 * Helper function to log errors with appropriate formatting
 * @param error - The error to log
 */
export function logError(error: unknown): void {
    if (isBaseError(error)) {
        logger.error(`Error code: ${error.code}`, error);
    } else {
        logger.error(error);
    }
}

