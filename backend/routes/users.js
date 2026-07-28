const express = require('express');

const {
  getUsers,
  getUserById,
  getUserMe,
  createUser,
  updateUser,
  changendAvatarUserMe,
  login,
} = require('../controllers/user');

const { auth } = require('../middlewares/auth');
const asyncHandler = require('../utils/asyncHandler');

const {
  registerUserSchema,
  loginUserSchema,
  updateUserSchema,
  updateAvatarSchema,
} = require('../middlewares/celebrate/user');

const router = express.Router();

router.post('/signin', loginUserSchema, asyncHandler(login));
router.post('/signup', registerUserSchema, asyncHandler(createUser));

router.use(asyncHandler(auth));

router.get('/', asyncHandler(getUsers));
router.get('/me', asyncHandler(getUserMe));
router.get('/:id', asyncHandler(getUserById));
router.put('/me', updateUserSchema, asyncHandler(updateUser));
router.patch('/me/avatar', updateAvatarSchema, asyncHandler(changendAvatarUserMe));

module.exports = { userRouter: router };
