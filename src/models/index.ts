import db from '../db.js';

import Artist from './Artist.js';
import Album from './Album.js';
import Song from './Song.js';

Artist.hasMany(Album);
Album.belongsTo(Artist, {
  foreignKey: {
    allowNull: false,
  },
});

Artist.hasMany(Song);
Song.belongsTo(Artist, {
  foreignKey: {
    allowNull: false,
  },
});

Album.hasMany(Song);
Song.belongsTo(Album);

export { db, Artist, Album, Song };
