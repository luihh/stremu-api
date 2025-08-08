import { DataTypes } from 'sequelize';
import db from '../db.js';

const Artist = db.define('artist', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Artist;
