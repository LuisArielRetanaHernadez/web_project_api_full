const express = require('express');

const {
  getUsers, getUserById, createUser, updateUser, changendAvatarUserMe, login,
} = require('../controllers/user');

const router = express.Router();

router.post('/singin', login);

router.get('/', getUsers);

router.get('/:id', getUserById);

router.post('/', createUser);

router.put('/me', updateUser);

router.patch('/me/avatar', (changendAvatarUserMe));

module.exports = { userRouter: router };
