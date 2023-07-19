const songs = []

const getAllSongs = () => {
  return songs
}

const addSong = (song) => {
  songs.push(song)
}

const updateSong = (songId, updatedSong) => {
  const songIndex = songs.findIndex((song) => song.id === songId)
  if (songIndex !== -1) {
    songs[songIndex] = updatedSong
  }
}

const incrementPlayCount = (songId) => {
  const songIndex = songs.findIndex((song) => song.id === songId)
  if (songIndex !== -1) {
    songs[songIndex].play += 1
  }
}

const deleteSong = (songId) => {
  const songIndex = songs.findIndex((song) => song.id === songId)
  if (songIndex !== -1) {
    songs.splice(songIndex, 1)
  }
}

const sortSongsByPlayCount = (order) => {
  const sortedSongs = [...songs]
  if (order === 'asc') {
    sortedSongs.sort((a, b) => a.play - b.play)
  } else if (order === 'dsc') {
    sortedSongs.sort((a, b) => b.play - a.play)
  }
  return sortedSongs
}

module.exports = {
  getAllSongs,
  addSong,
  updateSong,
  incrementPlayCount,
  deleteSong,
  sortSongsByPlayCount
}