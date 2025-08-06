const { DataTypes } = require('sequelize');
const db = require('../db');

const Artist = db.define('artist', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Artist;
