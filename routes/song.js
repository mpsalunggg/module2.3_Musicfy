const express = require('express')
const songController = require('../controllers/song')

const router = express.Router()

router.get('/', songController.getAllSongs)
router.get('/sorted', songController.sortSongsByPlayCount)
router.get('/:id', songController.getSongById)
router.post('/', songController.addSong)
router.patch('/:id', songController.updateSong)
router.patch('/play/:id', songController.incrementPlayCount)
router.delete('/:id', songController.deleteSong)

module.exports = router
