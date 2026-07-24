const express = require('express');

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/card');

const { protectCard } = require('../middlewares/protectCard');
const { auth } = require('../middlewares/auth')

const router = express.Router();

router.get('/', getCards);

router.use(auth)
router.post('/', createCard);

router.use(protectCard)
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = { cardRouter: router };
