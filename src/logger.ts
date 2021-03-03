import { nestLikeFileFormat } from './nestLikeFile.format';
import { Format } from 'logform';
import * as winston from 'winston';
import * as Transport from 'winston-transport';
import * as path from 'path';
import 'winston-daily-rotate-file';

const appName = process.env.LOG_APP_NAME || '';

const colorStr = process.env.LOG_COLOR || 'true';
const enableColor = colorStr && colorStr.trim().toLowerCase() === 'true' ? true : false;

const timestampStr = process.env.LOG_TIMESTAMP || 'true';
const enableTimestamp = timestampStr && timestampStr.trim().toLowerCase() === 'true' ? true : false;

const consoleFormat = winston.format.combine(
  winston.format.timestamp(),
  nestLikeFileFormat(appName, {color: enableColor, timestamp: enableTimestamp}),
);
const fileFormat = winston.format.combine(
  winston.format.timestamp(),
  nestLikeFileFormat(appName, {color: false, timestamp: enableTimestamp}),
);


const transportsStr = process.env.LOG_TRANSPORTS || 'console,file';
const transportsComp = transportsStr.split(',').map(t => t.trim());
const enableConsole = transportsComp.find(t => t.toLowerCase() === 'console') ? true : false;
const enableFile = transportsComp.find(t => t.toLowerCase() === 'file') ? true : false;

const transports: Transport[] = [];
if (enableConsole) {
  transports.push(new winston.transports.Console({
    level: process.env.LOG_LEVEL || 'debug',
    format: consoleFormat,
  }));
}
if (enableFile) {
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

  transports.push(
    new winston.transports.DailyRotateFile({
      level: 'error',
      format: fileFormat,
      dirname: logsFolder,
      filename: filePatternError,
      datePattern: fileDatePattern,
      maxFiles: maxFiles,
    })
  );
  transports.push(
    new winston.transports.DailyRotateFile({
      level: 'info',
      format: fileFormat,
      dirname: logsFolder,
      filename: filePatternInfo,
      datePattern: fileDatePattern,
      maxFiles: maxFiles,
    })
  );
  transports.push(
    new winston.transports.DailyRotateFile({
      level: 'debug',
      format: fileFormat,
      dirname: logsFolder,
      filename: filePatternDebug,
      datePattern: fileDatePattern,
      maxFiles: maxFiles,
    })
  );
}

export const loggerOptions: winston.LoggerOptions = {
  transports,
  // other options
};

export const logger = winston.createLogger(loggerOptions);
