const songService = require('../services/song')

const getAllSongs = (req, res) => {
  const songs = songService.getAllSongs()
  res.json({ songs })
}

const addSong = (req, res) => {
  const { title, artist, url, img_url } = req.body
  const splitArtist = artist.split(',').map((artist) => artist.trim())
  const song = {
    id: String(Date.now()),
    title,
    artist: splitArtist,
    url,
    img_url,
    play: 0,
  }
  if (title && artist && url) {
    songService.addSong(song)
    res.status(200).json({
      message: 'Berhasil Tambah Lagu',
      songs: songService.getAllSongs(),
    })
  } else {
    res.status(404).json({ message: 'Harap Isikan Semua Input!' })
  }
}

const updateSong = (req, res) => {
  const songId = req.params.id
  const { title, artist, url } = req.body
  const splitArtist = artist.split(',').map((artist) => artist.trim())
  const updatedSong = {
    id: songId,
    title,
    artist: splitArtist,
    url,
    img_url: '',
    play: 0,
  }
  songService.updateSong(songId, updatedSong)
  res.json({ message: 'Berhasil Update', songs: songService.getAllSongs() })
}

const incrementPlayCount = (req, res) => {
  const songId = req.params.id
  songService.incrementPlayCount(songId)
  res.json({
    message: 'Berhasil update jumlah play',
    songs: songService.getAllSongs(),
  })
}

const deleteSong = (req, res) => {
  const songId = req.params.id
  songService.deleteSong(songId)
  res.json({ message: 'Berhasil Delete', songs: songService.getAllSongs() })
}

const sortSongsByPlayCount = (req, res) => {
  const { order } = req.query
  const sortedSongs = songService.sortSongsByPlayCount(order)
  res.json({ sortedSongs })
}

module.exports = {
  getAllSongs,
  addSong,
  updateSong,
  incrementPlayCount,
  deleteSong,
  sortSongsByPlayCount
}
