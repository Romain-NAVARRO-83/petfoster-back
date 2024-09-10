import csrf from 'csrf';
const csrfProtection = new csrf();

export default function CSRF_Verification(req: any, res: any) {
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
