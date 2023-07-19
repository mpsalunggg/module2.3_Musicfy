const Song = require('../models/song')

const getAllSongs = () => {
  return Song.getAllSongs()
}

const getSongById = (songId) => {
  return Song.getSongById(songId)
}

const addSong = (song) => {
  return Song.addSong(song)
}

const updateSong = (songId, updatedSong) => {
  return Song.updateSong(songId, updatedSong)
}

const incrementPlayCount = (songId) => {
  return Song.incrementPlayCount(songId)
}

const deleteSong = (songId) => {
  return Song.deleteSong(songId)
}

const sortSongsByPlayCount = (favsong) => {
  return Song.sortSongsByPlayCount(favsong)
}

module.exports = {
  getAllSongs,
  getSongById,
  addSong,
  updateSong,
  incrementPlayCount,
  deleteSong,
  sortSongsByPlayCount,
}
