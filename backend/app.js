const express = require('express');
const mongoose = require('mongoose');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const { userRouter } = require('./routes/users.js');
const { cardRouter } = require('./routes/cards.js');

const { login, createUser } = require('./controllers/user.js');

const { centralErrors } = require('./middlewares/centralErrors.js');

const { requestLogger, errorLogger } =  require('./middlewares/logger.js')

const { loginUserSchema, registerUserSchema } = require('./middlewares/celebrate/user.js')

const asyncHandler = require('./utils/asyncHandler.js');

const cors = require('cors');



const app = express();

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

app.use(cors({
  origin: ['http://localhost:5173', 'https://web-project-api-full-br6h.vercel.app', 'https://webfullapi.vercel.app', '*'], // Reemplaza con el origen de tu frontend
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Permitir cookies y credenciales
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger); // Middleware de registro de solicitudes

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('El servidor se ha caído intencionalmente');
  }, 0);
});

app.post('/signin', loginUserSchema, asyncHandler(login));
app.post('/signup', registerUserSchema, asyncHandler(createUser));

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use(errorLogger); // Middleware de registro de errores

// Middleware de manejo de errores (debe estar al final)
app.use(centralErrors);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});
