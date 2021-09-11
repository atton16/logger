import { Request, Response } from 'express';

export function activityLogResponseSkipBodyMiddleware(
  req: Request,
  res: Response,
  next: Function
): void {
  res.skipBody = true;
  next();
}
