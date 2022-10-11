const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const postRouter = require('./routes/Posts');
const bodyParser = require('body-parser');

const PORT = 3000;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Home');
});

app.use('/posts', postRouter);

mongoose.connect(
  'mongodb+srv://Cinema:sEa85bxqmTiekTpt@test.rshk0.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true }
);
const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.on('open', () => console.log('Connected to Mongoose'));

app.listen(3000, () => {
  console.log(`Listening on port ${PORT}`);
});
