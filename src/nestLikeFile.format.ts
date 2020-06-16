import { Format } from 'logform';
import { format } from 'winston';
import safeStringify from 'fast-safe-stringify';

export const nestLikeFileFormat = (appName = 'NestWinston'): Format => format.printf(({ context, level, timestamp, message, ...meta }) => {
  return `${appName} ` +
         `${level.charAt(0).toUpperCase() + level.slice(1)}\t` +
         ('undefined' !== typeof timestamp ? `${new Date(timestamp).toLocaleString()} ` : '') +
         ('undefined' !== typeof context ? `${'[' + context + ']'} ` : '') +
         `${message} - ` +
         `${safeStringify(meta)}`;
});
