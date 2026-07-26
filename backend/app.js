const express = require('express');
const mongoose = require('mongoose');

const { userRouter } = require('./routes/users.js');
const { cardRouter } = require('./routes/cards.js');

const {centralErrors} = require('./middlewares/centralErrors.js');

const app = express();

require('dotenv').config();

const { PORT = 3000 } = process.env;

// Connect to MongoDB
async function connectToMongoDB() {
  const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

  try {
    await mongoose.connect(process.env.MONGO_URL,
      clientOptions
    );
    await mongoose.connection.db.admin().command({ ping: 1 });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
connectToMongoDB();

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
console.log('type ', typeof centralErrors);
app.use(centralErrors);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
