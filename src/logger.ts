import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { nestLikeFileFormat } from './nestLikeFile.format';
import * as winston from 'winston';
import * as path from 'path';
import 'winston-daily-rotate-file';

const consoleFormat = winston.format.combine(
  winston.format.timestamp(),
  nestWinstonModuleUtilities.format.nestLike(),
);
const fileFormat  = winston.format.combine(
  winston.format.timestamp(),
  nestLikeFileFormat(),
);
const filePrefix = process.env.LOG_FILE_PREFIX || '';
const filePatternError = filePrefix ? `${filePrefix}.err.%DATE%.log` : 'err.%DATE%.log';
const filePatternInfo = filePrefix ? `${filePrefix}.info.%DATE%.log` : 'info.%DATE%.log';
const filePatternDebug = filePrefix ? `${filePrefix}.debug.%DATE%.log` : 'debug.%DATE%.log';
const maxFiles = process.env.LOG_MAX_FILES || '60d';
const fileDatePattern = 'YYYY-MM-DD';

let logsFolder = process.env.LOG_FOLDER || './logs';
if (!path.isAbsolute(logsFolder)) {
  logsFolder = path.resolve(process.cwd(), logsFolder);
}

export const loggerOptions = {
  transports: [
    new winston.transports.Console({
      level: process.env.LOG_LEVEL || 'debug',
      format: consoleFormat,
    }),
    new winston.transports.DailyRotateFile({
      level: 'error',
      format: fileFormat,
      dirname: logsFolder,
      filename: filePatternError,
      datePattern: fileDatePattern,
      maxFiles: maxFiles,
    }),
    new winston.transports.DailyRotateFile({
      level: 'info',
      format: fileFormat,
      dirname: logsFolder,
      filename: filePatternInfo,
      datePattern: fileDatePattern,
      maxFiles: maxFiles,
    }),
    new winston.transports.DailyRotateFile({
      level: 'debug',
      format: fileFormat,
      dirname: logsFolder,
      filename: filePatternDebug,
      datePattern: fileDatePattern,
      maxFiles: maxFiles,
    }),
    // other transports...
  ],
  // other options
};

export const logger = winston.createLogger(loggerOptions);
