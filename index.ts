// Load environment variables
import 'dotenv/config';

// Import dependencies
import express from 'express';

// Create app
const app = express();
// import cors from 'cors';
import { router } from './router/router';

// ==============Juste pour test, à remplacer par Sequelize============
// import pg from 'pg'; // Importation par défaut du module

// const { Pool } = pg; // Extraction de Pool du module

// const pool = new Pool({
//   host: 'petfoster-db',
//   database: process.env.POSTGRES_DB,
//   password: process.env.POSTGRES_PASSWORD,
//   user: process.env.POSTGRES_USER,
//   port: 5432,

//   max: 20,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000,
// });

// const queryDatabase = async () => {
//   try {
//     // Exemple de requête SQL pour récupérer tous les enregistrements d'une table
//     const result = await pool.query(
//       'SELECT * FROM animals ORDER BY id LIMIT 3;'
//     );
//     console.log(result.rows); // Affiche les résultats de la requête
//     return result.rows[0];
//   } catch (error) {
//     console.error("Erreur lors de l'exécution de la requête", error);
//   } finally {
//     // Ferme la connexion au pool de connexions
//     await pool.end();
//   }
// };

// // Exécuter la fonction pour accéder à la base de données
// const test = await queryDatabase();

// // Configure routes
// app.get('/', (req, res) => {
//   res.json(test);
// });
// ====================================================================

// Configure routes
app.use('/api', router);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
