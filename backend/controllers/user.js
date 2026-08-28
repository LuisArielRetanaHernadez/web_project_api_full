/* eslint-disable linebreak-style */
const user = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { NotFoundError, UnauthorizedError, InternalServerError, ConflictError } = require('../utils/managerErrors');

require('dotenv').config();

const { JWT_SECRET } = process.env;

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const userFound = await user.findOne({ email }).select('+password');

  if (!userFound) {
    throw new UnauthorizedError('Email o contraseña incorrectos');
  }

  const isMatch = await bcrypt.compare(password, userFound.password);
  if (!isMatch) {
    throw new UnauthorizedError('Email o contraseña incorrectos');
  }

  const token = jwt.sign({ id: userFound._id }, JWT_SECRET, { expiresIn: '7d' });
  userFound.password = undefined;

  res.status(200).json({
    success: true,
    status: 200,
    token,
    user: userFound,
  });
};

exports.createUser = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 5);
  const existingUser = await user.findOne({ email: req.body.email });
  
  if (existingUser) {
    throw new ConflictError('El usuario ya existe');
  }

  const newUser = await user.create({ ...req.body, password: hashedPassword });

  if (!newUser) {
    throw new InternalServerError('No se pudo crear el usuario');
  }

  res.status(201).json({
    success: true,
    status: 201,
    message: 'Usuario creado exitosamente',
    user: newUser,
  }
  );
};

exports.getUserMe = async (req, res) => {
  const tokenData = req.user;

  if (!tokenData) {
    throw new UnauthorizedError('No token provided');
  }

  const userFound = await user.findById(tokenData.id);

  if (!userFound) {
    throw new NotFoundError('No se encontró el usuario');
  }

  res.status(200).json({
    success: true,
    status: 200,
    user: userFound,
  });
};

exports.updateUser = async (req, res) => {
  const updatedUser = await user.findByIdAndUpdate(
    req.user.id,
    req.body,
    { new: true },
  );

  if (!updatedUser) {
    throw new InternalServerError('No se pudo actualizar el usuario');
  }

  res.status(200).json({
    success: true,
    status: 200,
    message: 'Usuario actualizado exitosamente',
    user: updatedUser,
  });
};

exports.changendAvatarUserMe = async (req, res) => {
  const updatedUser = await user.findByIdAndUpdate(
    req.user.id,
    { avatar: req.body.avatar },
    { new: true },
  );

  if (!updatedUser) {
    throw new InternalServerError('No se pudo actualizar el avatar');
  }

  res.status(200).json({
    success: true,
    status: 200,
    message: 'Avatar actualizado exitosamente',
    user: updatedUser,
  });
};

exports.getUsers = async (req, res) => {
  const usersFound = await user.find({});

  if (!usersFound || usersFound.length === 0) {
    throw new NotFoundError('No se encontraron usuarios');
  }

  res.status(200).json({ success: true, status: 200, users: usersFound });
};

exports.getUserById = async (req, res) => {
  const userFound = await user.findById(req.params.id);

  if (!userFound) {
    throw new NotFoundError('No se encontró el usuario');
  }

  res.status(200).json({ success: true, status: 200, user: userFound });
};