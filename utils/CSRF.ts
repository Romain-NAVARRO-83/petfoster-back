import 'dotenv/config';

import csrf from 'csrf';
const csrfProtection = new csrf();
import { Request, Response } from 'express';

export function create(req: Request, res: Response) {
  const csrfToken = csrfProtection.create(process.env.CSRF_SECRET as string);
  // Send the token as a cookie or in the response body
  res.status(200).json(csrfToken);
}

export function verificate(req: Request, res: Response) {
  if (process.env.CSRF_IS_OFF === 'true') {
  } else {
    // Validate the CSRF token in requests
    const csrfToken = req.headers['x-xsrf-token'];
    if (
      !csrfProtection.verify(
        process.env.CSRF_SECRET as string,
        csrfToken as string
      )
    ) {
      return res.status(403).send('Invalid CSRF token');
    }
    // Continue processing the request...
  }
}
