// Load environment variables
import 'dotenv/config';

// Import dependencies
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// Create app
const app = express();

// Serve user and animal images
// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "public/img" directory
app.use('/img', express.static(path.join(__dirname, 'public', 'img')));
import cors from 'cors';
import { router } from './router/router';

// Add body parser
app.use(express.urlencoded({ extended: true })); // Parser les bodies de type "application/www-form-urlencoded"
app.use(express.json()); // Parser les bodies de type "application/json"

// Utiliser une clé secrète pour signer les cookies
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));

// Utiliser les cookies de manières sécurisée
app.use(
  session({
    saveUninitialized: true,
    resave: true,
    secret: process.env.SESSION_SECRET as string, // Empêche la falsification des sessions
    // Empêche le JS du client d'accéder aux cookies
    cookie: { secure: true, httpOnly: true, maxAge: 10800000 }, // Le navigateur envoie le coookie que sur HTTPS
  })
);

// Authorize CORS requests
// app.use(cors('http://localhost:3000'));
// * = tous les domaines (pour nous faciliter la vie sur la saison future, mais en pratique, on devrait limiter l'accès à notre API uniquement au front qui va nous appeler !)
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

// Configure routes
app.use('/api', router);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
