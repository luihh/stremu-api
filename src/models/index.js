const db = require('../db');

const Artist = require('./Artist');
const Album = require('./Album');
const Song = require('./Song');

Artist.hasMany(Album);
Album.belongsTo(Artist);

Artist.hasMany(Song);
Song.belongsTo(Artist);

Album.hasMany(Song);
Song.belongsTo(Album);

module.exports = {
  db,
  Artist,
  Album,
  Song,
};
