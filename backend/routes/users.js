const express = require('express');

const {
  getUsers, getUserById, getUserMe, createUser, updateUser, changendAvatarUserMe, login,
} = require('../controllers/user');

const { auth } = require('../middlewares/auth');

const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.post('/singin', asyncHandler(login));

router.post('/singup', asyncHandler(createUser));

router.use(auth)

router.get('/', asyncHandler(getUsers));

router.get('/me', asyncHandler(getUserMe));

router.get('/:id', asyncHandler(getUserById));

router.put('/me', asyncHandler(updateUser));

router.patch('/me/avatar', asyncHandler(changendAvatarUserMe));

module.exports = { userRouter: router };
