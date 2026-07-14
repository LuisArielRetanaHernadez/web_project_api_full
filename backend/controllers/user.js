/* eslint-disable linebreak-style */
const user = require('../models/user');

exports.getUsers = async (req, res) => {
  await user.find({})
    .orFail(() => {
      const error = new Error('No se encontraron usuarios');
      error.statusCode = 404;
      throw error;
    })
    .then((usersFound) => res.status(200).json({ data: usersFound }))
    .catch((err) => res.status(err.statusCode || 500).json({ message: err.message }));
};

exports.getUserById = async (req, res) => {
  await user.findById(req.params.id)
    .orFail(() => {
      const error = new Error('No se encontró el usuario');
      error.statusCode = 404;
      throw error;
    })
    .then((userFound) => res.status(200).json({ data: userFound }))
    .catch((err) => res.status(err.statusCode || 500).json({ message: err.message }));
};

exports.createUser = async (req, res) => {
  try {
    const newUser = await user.create(req.body);
    if (!newUser) {
      const error = new Error('No se pudo crear el usuario');
      error.statusCode = 500;
      throw error;
    }
    res.status(201).json(newUser);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await user.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true },
    );
    if (!updatedUser) {
      const error = new Error('No se pudo actualizar el usuario');
      error.statusCode = 500;
      throw error;
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.changendAvatarUserMe = async (req, res) => {
  try {
    const updatedUser = await user.findByIdAndUpdate(
      req.user._id,
      { avatar: req.body.avatar },
      { new: true },
    );
    if (!updatedUser) {
      const error = new Error('No se pudo actualizar el avatar');
      error.statusCode = 500;
      throw error;
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
