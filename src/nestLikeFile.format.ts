import { Format } from 'logform';
import { format } from 'winston';
import bare from 'cli-color/bare';
import clc from 'cli-color';
import safeStringify from 'fast-safe-stringify';

const nestLikeColorScheme: Record<string, bare.Format> = {
  info: clc.greenBright,
  error: clc.red,
  warn: clc.yellow,
  debug: clc.magentaBright,
  verbose: clc.cyanBright,
};

export const nestLikeFileFormat = (
  appName = 'NestWinston',
  opt = { color: true, timestamp: true }
): Format =>
  format.printf(({ context, level, timestamp, message, ...meta }) => {
    const color =
      nestLikeColorScheme[level] || ((text: string): string => text);

    if (opt.color) {
      return (
        `${color(`[${appName}]`)} ` +
        `${clc.yellow(level.charAt(0).toUpperCase() + level.slice(1))}\t` +
        ('undefined' !== typeof timestamp && opt.timestamp
          ? `${new Date(timestamp).toLocaleString()} `
          : '') +
        ('undefined' !== typeof context
          ? `${clc.yellow('[' + context + ']')} `
          : '') +
        `${color(message)} - ` +
        `${safeStringify(meta)}`
      );
    }

    return (
      `[${appName}] ` +
      `${level.charAt(0).toUpperCase() + level.slice(1)}\t` +
      ('undefined' !== typeof timestamp && opt.timestamp
        ? `${new Date(timestamp).toLocaleString()} `
        : '') +
      ('undefined' !== typeof context ? `${'[' + context + ']'} ` : '') +
      `${message} - ` +
      `${safeStringify(meta)}`
    );
  });
