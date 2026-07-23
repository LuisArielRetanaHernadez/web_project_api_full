const Card = require('../models/card')

exports.protectCard = async (req, res, next) => {
    if (req.params.cardId == null) {
        const error = new Error('ID card no valido')
        error.statusCode = 401
        throw error
    }

    const getCard = await Card.find({
        _id: req.params.id,
        owner: req.user._id
    })

    if (!getCard) {
        const error = new Error('Action not Autorization')
        error.statusCode = 401
        throw error
    }

    req.card = getCard

    return next()
}