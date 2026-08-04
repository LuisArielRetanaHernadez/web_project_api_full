const express = require('express');

const {
  getCards,
  getCardsByIdUser,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/card');

const { protectCard } = require('../middlewares/protectCard');
const { auth } = require('../middlewares/auth');
const asyncHandler = require('../utils/asyncHandler');

const { createCardSchema, deleteCardSchema } = require('../middlewares/celebrate/card');

const router = express.Router();

router.get('/', asyncHandler(getCards));
router.get('/:userId', asyncHandler(getCardsByIdUser));

router.put('/:cardId/likes', auth, asyncHandler(likeCard));
router.delete('/:cardId/likes', auth, asyncHandler(dislikeCard));

router.post('/', auth, createCardSchema, asyncHandler(createCard));
router.delete('/:cardId', auth, deleteCardSchema, asyncHandler(protectCard), asyncHandler(deleteCard));

module.exports = { cardRouter: router };
