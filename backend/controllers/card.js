/* eslint-disable linebreak-style */
const card = require('../models/card');
const { NotFoundError, ForbiddenError, InternalServerError } = require('../utils/managerErrors');

exports.getCards = async (req, res) => {
  const cardsFound = await card.find({});

  if (!cardsFound || cardsFound.length === 0) {
    throw new NotFoundError('No se encontraron cartas');
  }

  res.status(200).json({ data: cardsFound });
};

exports.deleteCard = async (req, res) => {
  const cardDelete = await card.findById(req.params.cardId);

  if (!cardDelete) {
    throw new NotFoundError('No se encontró la carta');
  }

  if (cardDelete.owner.toString() !== req.user.id) {
    throw new ForbiddenError('No tienes permiso para eliminar esta carta');
  }

  await card.deleteOne({ _id: req.params.cardId });
  res.status(200).json({ message: 'Carta eliminada' });
};

exports.createCard = async (req, res) => {
  const idUser = req.user.id;

  const newCard = await card.create({ ...req.body, owner: idUser });

  if (!newCard) {
    throw new InternalServerError('No se pudo crear la carta');
  }

  res.status(201).json(newCard);
};

exports.likeCard = async (req, res) => {
  const updatedCard = await card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user.id } },
    { new: true },
  );

  if (!updatedCard) {
    throw new InternalServerError('No se pudo actualizar la carta');
  }

  res.status(200).json(updatedCard);
};

exports.dislikeCard = async (req, res) => {
  const updatedCard = await card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user.id } },
    { new: true },
  );

  if (!updatedCard) {
    throw new InternalServerError('No se pudo actualizar la carta');
  }

  res.status(200).json(updatedCard);
};
