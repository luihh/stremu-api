import { Sequelize } from 'sequelize';

const db = new Sequelize(process.env.POSTGRES_URL, {
  dialect: 'postgres',
  logging: false,
});

export default db;
