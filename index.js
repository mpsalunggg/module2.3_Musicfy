const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const songRouter = require('./routes/song');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/songs', songRouter);

app.get('/', (req, res) => {
  const pathFile = path.join(__dirname, 'public/musicfy.html');
  res.sendFile(pathFile);
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

