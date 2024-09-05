// Load environment variables
import 'dotenv/config';

// Import dependencies
import express from 'express';

// Create app
const app = express();
import cors from 'cors';
import { router } from './router/router';

// Add body parser
app.use(express.urlencoded({ extended: true })); // Parser les bodies de type "application/www-form-urlencoded"
app.use(express.json()); // Parser les bodies de type "application/json"


// Authorize CORS requests
app.use(cors('*' as any)); // * = tous les domaines (pour nous faciliter la vie sur la saison future, mais en pratique, on devrait limiter l'accès à notre API uniquement au front qui va nous appeler !)

// Configure routes
app.use('/api', router);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
