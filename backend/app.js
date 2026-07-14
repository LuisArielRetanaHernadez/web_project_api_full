const express = require('express');
const mongoose = require('mongoose');

const { userRouter } = require('./routes/users.js');
const { cardRouter } = require('./routes/cards.js');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/aroundb')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '676092879a2aa29abfbf23b4',
  };

  next();
});
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
