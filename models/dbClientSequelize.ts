import 'dotenv/config';
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  process.env.PG_URL as string,
  // process.env.POSTGRES_DB as string,
  // process.env.POSTGRES_USER as string,
  // process.env.POSTGRES_PASSWORD as string,
  {
    // host: 'petfoster-db',
    dialect: 'postgres',
  }
);
