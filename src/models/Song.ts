import { DataTypes, Model } from 'sequelize';
import db from '../db.js';

interface SongModel extends Model {
  id: number;
  title: string;
  artistId: number;
  albumId?: number | null;
}

const Song = db.define<SongModel>(
  'song',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artistId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    albumId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['title', 'albumId', 'artistId'],
      },
    ],
  }
);

Song.addHook('beforeValidate', async (song: SongModel) => {
  if (!song.albumId) {
    const existingSingle = await Song.findOne({
      where: {
        title: song.title,
        artistId: song.artistId,
        albumId: null,
      },
    });

    if (existingSingle && existingSingle.id !== song.id) {
      throw new Error(`Single "${song.title}" already exists for this artist`);
    }
  }
});

export default Song;
