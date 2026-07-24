/* eslint-disable linebreak-style */
const card = require('../models/card');

exports.getCards = async (req, res) => {
  await card.find({})
    .orFail(() => {
      const error = new Error('No se encontraron cartas');
      error.statusCode = 404;
      throw error;
    })
    .then((cardsFound) => res.status(200).json({ data: cardsFound }))
    .catch((err) => res.status(err.statusCode).json({ message: err.message }));
};

exports.deleteCard = async (req, res) => {
  try {
    const cardDelete = await card.findById(req.params.cardId);

    if (!cardDelete) {
      const error = new Error('No se encontró la carta');
      error.statusCode = 404;
      throw error;
    }
    if (cardDelete.owner.toString() !== req.user._id) {
      const error = new Error('No tienes permiso para eliminar esta carta');
      error.statusCode = 403;
      throw error;
    }
    await card.deleteOne({ _id: req.params.cardId });
    res.status(200).json({ message: 'Carta eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCard = async (req, res) => {
  try {
    const idUser = req.user.id

    const newCard = await card.create({...req.body, owner: idUser });
    if (!newCard) {
      const error = new Error('No se pudo crear la carta');
      error.statusCode = 500;
      throw error;
    }
    res.status(201).json(newCard);
  } catch (error) {
    res.status(error.statusCode || 400).json({ message: error.message });
  }
};

exports.likeCard = async (req, res) => {
  try {
    const updatedCard = await card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!updatedCard) {
      const error = new Error('No se pudo actualizar la carta');
      error.statusCode = 500;
      throw error;
    }
    res.status(200).json(updatedCard);
  } catch (error) {
    res.status(error.statusCode).json({ message: error.message });
  }
};

exports.dislikeCard = async (req, res) => {
  try {
    const updatedCard = await card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!updatedCard) {
      const error = new Error('No se pudo actualizar la carta');
      error.statusCode = 500;
      throw error;
    }
    res.status(200).json(updatedCard);
  } catch (error) {
    res.status(error.statusCode).json({ message: error.message });
  }
};
