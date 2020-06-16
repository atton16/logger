import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';

export const loggerOptions = {
  transports: [
    new winston.transports.Console({
      level: process.env.LOG_LEVEL || 'debug',
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike(),
      ),
    }),
    // other transports...
  ],
  // other options
};

export const logger = winston.createLogger(loggerOptions);
