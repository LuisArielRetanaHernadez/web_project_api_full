const express = require('express');
const mongoose = require('mongoose');

const { userRouter } = require('./routes/users.js');
const { cardRouter } = require('./routes/cards.js');
const { centralErrors } = require('./middlewares/centralErrors.js');

const { requestLogger, errorLogger } =  require('./middlewares/logger.js')

const app = express();

require('dotenv').config();

const { PORT = 3000, MONGO_URL } = process.env;

// Conectar a MongoDB
async function connectToMongoDB() {
  const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

  try {
    await mongoose.connect(MONGO_URL, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log('Conectado a MongoDB exitosamente');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1);
  }
}

connectToMongoDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger); // Middleware de registro de solicitudes

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use(errorLogger); // Middleware de registro de errores

// Middleware de manejo de errores (debe estar al final)
app.use(centralErrors);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});
