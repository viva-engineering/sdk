
import { Logger } from '@viva-eng/logger';

let _logger: Logger;

/**
 * Sets the logger instance that will be used for all logging purposes by the SDK
 *
 * @param newLogger The new logger to be assigned, fitting the interface of `@viva-eng/logger`
 */
export const configureLogger = (newLogger: Logger) => {
	_logger = newLogger;
};

export const logger: Logger = Object.freeze({
	error: (message: string, meta?: object) => _logger.error(message, meta),
	warn: (message: string, meta?: object) => _logger.warn(message, meta),
	info: (message: string, meta?: object) => _logger.info(message, meta),
	verbose: (message: string, meta?: object) => _logger.verbose(message, meta),
	debug: (message: string, meta?: object) => _logger.debug(message, meta),
	silly: (message: string, meta?: object) => _logger.silly(message, meta)
}) as any;
