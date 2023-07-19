const Song = require('../models/song')

const getAllSongs = () => {
  return Song.getAllSongs()
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

const sortSongsByPlayCount = (order) => {
  return Song.sortSongsByPlayCount(order)
}

module.exports = {
  getAllSongs,
  addSong,
  updateSong,
  incrementPlayCount,
  deleteSong,
  sortSongsByPlayCount
}
