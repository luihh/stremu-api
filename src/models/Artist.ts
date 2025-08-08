import { DataTypes, Model } from 'sequelize';
import db from '../db.js';

interface ArtistModel extends Model {
  id: number;
  name: string;
}

const Artist = db.define<ArtistModel>(
  'artist',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default Artist;
