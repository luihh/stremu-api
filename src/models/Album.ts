import { DataTypes } from 'sequelize';
import db from '../db.js';

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

export default Album;
