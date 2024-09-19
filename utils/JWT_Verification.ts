import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export function verifyJWT(req: Request, res: Response, next) {
  const authorization = req.headers.authorization;
  //if(!authorization) return 401 else {}
  console.log(req.headers.authorization);

  if (authorization) {
    const token = authorization.split(' ')[1];
    try {
      const jwtContent = jwt.verify(token, process.env.JWTSECRET as string);
      req.user = jwtContent;
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        console.log('Invalid token', err);
        return res.status(401).json({ error: 'Token has expired' });
      } else {
        console.log('Invalid token', err);
        return res.status(401).json({ error: 'Invalid token' });
      }
    }
  }
  next();
}
