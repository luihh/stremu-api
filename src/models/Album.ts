import { DataTypes, Model } from 'sequelize';
import db from '../db.js';

interface AlbumModel extends Model {
  id: number;
  title: string;
  releaseYear: number;
  artistId: number;
}

const Album = db.define<AlbumModel>(
  'album',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    releaseYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    artistId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['title', 'artistId'],
      },
    ],
  }
);

export default Album;
