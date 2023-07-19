const btnSubmit = document.getElementById('createSong')
const errorMsg = document.getElementById('msg')
const selectOption = document.getElementById('sorting')

btnSubmit.addEventListener('click', async () => {
  let title = document.getElementById('title')
  let artist = document.getElementById('artist')
  let url = document.getElementById('duration')
  let images = document.getElementById('gambar')

  try {
    const response = await fetch('http://localhost:3001/songs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: Date.now(),
        title: title.value,
        artist: artist.value,
        url: url.value,
        img_url: images.value,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message)
    }

    const data = await response.json()
    // displaySong(data.songs)
    errorMsg.innerText = 'Lagi Proses Nich...'
    setTimeout(() => {
      title.value = ''
      artist.value = ''
      url.value = ''
      images.value = ''
      displaySongs(data.songs)
      console.log(data)
    }, 2000)
  } catch (err) {
    console.log(err.message)
    errorMsg.innerText = err.message
  }
})

selectOption.addEventListener('change', async () => {
  const selectedValue = selectOption.value

  let url = 'http://localhost:3001/songs'

  if (selectedValue === 'asc') {
    url += '/sorted?favsong=asc'
  } else if (selectedValue === 'dsc') {
    url += '/sorted?favsong=dsc'
  }

  try {
    const response = await fetch(url)
    const data = await response.json()
    displaySongs(data.sortedSongs)
    console.log(data)
  } catch (error) {
    console.log(error)
    errorMsg.innerText = error.message
  }
})

const displaySongs = (songs) => {
  const outputDiv = document.getElementById('output')
  outputDiv.innerHTML = ''
  errorMsg.innerText = ''
  if (songs.length) {
    songs.forEach((song) => {
      const cardDiv = document.createElement('div')
      const cardBtn = document.createElement('div')
      const img = document.createElement('img')
      const elTitle = document.createElement('h2')
      const elArtist = document.createElement('p')
      const elUrl = document.createElement('a')
      const editBtn = document.createElement('button')
      const deleteBtn = document.createElement('button')
      const elTotalPlay = document.createElement('p')

      cardDiv.classList.add('card')
      cardBtn.classList.add('card-btn')
      elTitle.classList.add('title')
      elUrl.classList.add('url')
      editBtn.classList.add('btn-edit')
      deleteBtn.classList.add('btn-delete')
      elTotalPlay.classList.add('total-play')

      elUrl.target = '_blank'
      img.src = `${
        song.img_url
          ? song.img_url
          : 'https://media.istockphoto.com/id/1175435360/vector/music-note-icon-vector-illustration.jpg?s=612x612&w=0&k=20&c=R7s6RR849L57bv_c7jMIFRW4H87-FjLB8sqZ08mN0OU='
      }`
      // img.src = song.img_url

      editBtn.innerText = 'Edit'
      editBtn.addEventListener('click', () => editSong(song))

      deleteBtn.innerText = 'Hapus'
      deleteBtn.addEventListener('click', () => deleteSong(song))

      elUrl.addEventListener('click', () => updatePlay(song))

      elTitle.innerText = song.title
      elArtist.innerText = song.artist
      elUrl.href = song.url
      elUrl.innerText = 'Play'
      elTotalPlay.innerText = `${song.play === 0 ? '' : 'Play : ' + song.play}`

      cardDiv.appendChild(img)
      cardDiv.appendChild(elTitle)
      cardDiv.appendChild(elArtist)
      cardDiv.appendChild(elUrl)
      cardBtn.appendChild(editBtn)
      cardBtn.appendChild(deleteBtn)
      cardDiv.appendChild(cardBtn)
      cardDiv.appendChild(elTotalPlay)
      outputDiv.appendChild(cardDiv)
    })
  } else {
    errorMsg.innerText = 'Playlist Lagu Masih Kosong Nih!'
  }
}

const editSong = async (song) => {
  const newTitle = prompt('Masukan Judul Baru!')
  const newArtist = prompt('Masukan Artis Baru!')
  const newUrl = prompt('Masukkan Url Baru!')

  errorMsg.innerText = 'Lagi Proses Edit Nich...'
  try {
    const response = await fetch(`http://localhost:3001/songs/${song.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: newTitle,
        artist: newArtist,
        url: newUrl,
      }),
    })

    const data = await response.json()
    errorMsg.innerText = 'Edit Berhasil!'
    displaySongs(data.songs)
    console.log(data)
  } catch (err) {
    console.log(err)
    errorMsg.innerText = err
  }
}

const deleteSong = async (song) => {
  errorMsg.innerText = 'Lagi Proses Hapus Nich...'
  try {
    const response = await fetch(`http://localhost:3001/songs/${song.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    errorMsg.innerText = 'Hapus Berhasil!'
    displaySongs(data.songs)
    console.log(data)
  } catch (err) {
    console.log(err)
    errorMsg.innerText = err
  }
}

const updatePlay = async (song) => {
  try {
    const response = await fetch(
      `http://localhost:3001/songs/play/${song.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await response.json()
    displaySongs(data.songs)
    console.log(data)
  } catch (err) {
    console.log(err)
    errorMsg.innerText = err
  }
}

fetch('http://localhost:3001/songs')
  .then((response) => response.json())
  .then((data) => displaySongs(data.songs))
  .catch((error) => console.log(error))
