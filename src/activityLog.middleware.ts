import { Request, Response, } from 'express';
import { logger } from './logger';

export function activityLogMiddleware(req: Request, res: Response, next: Function): void {
  let reqBody = '';
  // Request log
  req.on('data', function(chunk) {
    reqBody += chunk;
  });
  req.on('end', function() {
    logger.info(`${this.method} ${this.url}`);
    logger.info(`req.body DUMP START`);
    logger.info(reqBody);
    logger.info(`req.body DUMP END`);
  });

  // Responsne log
  const sendFn = res.send;
  let resBody;
  res.send = function (body?: any): any {
    resBody = body;
    return sendFn.call(this, body);
  };
  res.on('finish', function() {
    const statusCode = this.statusCode;
    const skipBody = this.skipBody;
    const isJson = this.getHeaders()['content-type'].includes('application/json');
    resBody = isJson ? JSON.stringify(JSON.parse(resBody), null, 2) : resBody;
    logger.info(`res.statusCode: ${statusCode}`);
    if (statusCode < 300 && skipBody) {
      logger.info(`res.body DUMP SKIPPED!`);
    } else {
      logger.info(`res.body DUMP START`);
      logger.info(resBody);
      logger.info(`res.body DUMP END`);
    }
  });
  next();
}
