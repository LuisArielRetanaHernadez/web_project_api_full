const Card = require('../models/card');
const { BadRequestError, ForbiddenError } = require('../utils/managerErrors');

exports.protectCard = async (req, res, next) => {
  const { cardId } = req.params;

  if (!cardId) {
    throw new BadRequestError('ID de carta no válido');
  }

  const getCard = await Card.findOne({
    _id: cardId,
    owner: req.user.id,
  });

  if (!getCard) {
    throw new ForbiddenError('No tienes permiso para acceder a esta carta');
  }

  req.card = getCard;
  return next();
};