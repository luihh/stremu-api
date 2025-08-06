const { Sequelize } = require('sequelize');

const db = new Sequelize(process.env.POSTGRES_URL, {
  logging: false,
});

module.exports = db;
