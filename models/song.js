const songs = []

const getAllSongs = () => {
  return songs
}

const getSongById = (songId) => {
  const songIndex = songs.find((song) => song.id === songId)
  return songIndex
}

const addSong = (song) => {
  songs.push(song)
}

const updateSong = (songId, data) => {
  const splitArtist =
    typeof data.artist === 'string'
      ? data.artist.split(',').map((artist) => artist.trim())
      : data.artist
  const songIndex = songs.findIndex((song) => song.id === songId)
  console.log('asdadas', data)
  if (songIndex !== -1) {
    const updatedSong = { ...songs[songIndex] }
    if (data.title) {
      updatedSong.title = data.title
    }
    if (data.artist) {
      updatedSong.artist = splitArtist
    }
    if (data.url) {
      updatedSong.url = data.url
    }
    if (data.img_url) {
      updatedSong.img_url = data.img_url
    }

    songs[songIndex] = updatedSong
    return songs
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

const sortSongsByPlayCount = (favsong) => {
  let sortedSongs = [...songs]

  if (favsong) {
    if (favsong === 'asc') {
      sortedSongs.sort((a, b) => a.play - b.play)
    } else if (favsong === 'dsc') {
      sortedSongs.sort((a, b) => b.play - a.play)
    }
  }

  return sortedSongs
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
