const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))

const songs = []

app.get('/songs', (req, res) => {
  res.json({ songs })
})

app.post('/songs', (req, res) => {
  const { title, artist, url, img_url, id } = req.body
  const splitArtist = artist.split(',').map((artist) => artist.trim())
  const song = {
    id: String(Date.now()),
    title: title,
    artist: splitArtist,
    url: url,
    img_url: img_url,
    play: 0,
  }
  if (title && artist && url) {
    songs.push(song)
    console.log(songs)
    res.status(200).json({ message: 'Berhasil Tambah Lagu', songs })
  } else {
    res.status(404).json({ message: 'Harap Isikan Semua Input!' })
  }
})

app.patch('/songs/:id', (req, res) => {
  const songId = req.params.id
  const { title, artist, url } = req.body
  const splitArtist = artist.split(',').map((artist) => artist.trim())
  const songIndex = songs.findIndex((song) => song.id === songId)
  console.log(songIndex)
  if (songIndex !== -1) {
    const updatedSong = { ...songs[songIndex] }
    if (title) {
      updatedSong.title = title
    }
    if (artist) {
      updatedSong.artist = splitArtist
    }
    if (url) {
      updatedSong.url = url
    }
    songs[songIndex] = updatedSong
    res.json({ message: 'Berhasil Update', songs })
  } else {
    res.status(404).json({ message: 'not found' })
  }
})

app.patch('/songs/play/:id', (req, res) => {
  const songId = req.params.id
  const songIndex = songs.findIndex((song) => song.id === songId)

  const updatedSong = { ...songs[songIndex] }
  updatedSong.play += 1
  songs[songIndex] = updatedSong
  res.json({ message: 'Berhasil updata jumlah play', songs })
})

app.delete('/songs/:id', (req, res) => {
  const songId = req.params.id
  //   console.log(songId)
  const songIndex = songs.findIndex((song) => song.id === songId)
  if (songIndex !== -1) {
    songs.splice(songIndex, 1)
    res.json({ message: 'Berhasil Delete', songs })
  } else {
    res.status(404).json({ message: 'not found' })
  }
})

app.get('/songs/sorted', (req, res) => {
  const { favsong } = req.query

  let sortedSongs = [...songs]

  if (favsong) {
    if (favsong === 'asc') {
      sortedSongs.sort((a, b) => a.play - b.play)
    } else if (favsong === 'dsc') {
      sortedSongs.sort((a, b) => b.play - a.play)
    }
  }

  res.json({ sortedSongs })
})

app.get('/', (req, res) => {
  const pathFile = path.join(__dirname, 'public/musicfy.html')
  res.sendFile(pathFile)
})

app.listen(3001, () => {
  console.log('Server is running on port 3001')
})
