/**
 * Logging levels in order of severity (higher number = more severe)
 */
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4, // Disables all logging
}

/**
 * Logger configuration
 */
interface LoggerConfig {
  level: LogLevel;
}

/**
 * Default logger configuration
 * Can be overridden by setting the log level via environment variable or configuration
 */
let config: LoggerConfig = {
  level: LogLevel.DEBUG, // Default to INFO level
};

/**
 * Initialize logger with a specific log level
 */
export function setLogLevel(level: LogLevel): void {
  config.level = level;
}

/**
 * Get current log level
 */
export function getLogLevel(): LogLevel {
  return config.level;
}

/**
 * Check if a log level should be logged based on current configuration
 */
function shouldLog(level: LogLevel): boolean {
  return level >= config.level && config.level !== LogLevel.NONE;
}

/**
 * Logger interface
 */
interface Logger {
  debug(...args: unknown[]): void;
  info(...args: unknown[]): void;
  warn(...args: unknown[]): void;
  error(...args: unknown[]): void;
}

/**
 * Logger implementation
 */
const logger: Logger = {
  debug(...args: unknown[]): void {
    if (shouldLog(LogLevel.DEBUG)) {
      console.debug(...args);
    }
  },

  info(...args: unknown[]): void {
    if (shouldLog(LogLevel.INFO)) {
      console.log(...args);
    }
  },

  warn(...args: unknown[]): void {
    if (shouldLog(LogLevel.WARN)) {
      console.warn(...args);
    }
  },

  error(...args: unknown[]): void {
    if (shouldLog(LogLevel.ERROR)) {
      console.error(...args);
    }
  },
};

export default logger;

