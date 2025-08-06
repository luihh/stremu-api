const { DataTypes } = require('sequelize');
const db = require('../db');

const Album = db.define('album', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  releaseYear: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Album;
