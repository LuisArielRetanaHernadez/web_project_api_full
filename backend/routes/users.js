const express = require('express');

const {
  getUsers, getUserById, getUserMe, createUser, updateUser, changendAvatarUserMe, login,
} = require('../controllers/user');

const { auth } = require('../middlewares/auth');

const router = express.Router();

router.post('/singin', login);

router.post('/singup', createUser);

router.get('/me', auth, getUserMe);

router.get('/', getUsers);

router.get('/:id', getUserById);

router.put('/me', updateUser);

router.patch('/me/avatar', (changendAvatarUserMe));

module.exports = { userRouter: router };
