const express = require('express');

const {
  getUsers, getUserById, createUser, updateUser, changendAvatarUserMe,
} = require('../controllers/user');

const router = express.Router();

router.get('/', getUsers);

router.get('/:id', getUserById);

router.post('/', createUser);

router.put('/me', updateUser);

router.patch('/me/avatar', (changendAvatarUserMe));

module.exports = { userRouter: router };
