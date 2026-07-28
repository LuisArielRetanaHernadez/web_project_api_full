const {celebrate, Joi, Segments, errors} = require('celebrate');

const registerUserSchema = celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().min(2).max(30).optional(),
        about: Joi.string().max(40).optional(),
        avatar: Joi.string().uri().optional(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    }),
});

const loginUserSchema = celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    }),
});

const updateUserSchema = celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().min(2).max(30).optional(),
        about: Joi.string().max(40).optional(),    
    })
})

const updateAvatarSchema = celebrate({
    [Segments.BODY]: Joi.object().keys({
        avatar: Joi.string().uri().required(),
    })
})



module.exports = {
    registerUserSchema,
    loginUserSchema,
    updateUserSchema,
    updateAvatarSchema
};