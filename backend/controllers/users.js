const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequest');
const Unauthorized = require('../errors/unauthorized');
const Conflict = require('../errors/Conflict');

const { JWT_SECRET = 'somesecretkey' } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};
const getUser = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден!');
      } else {
        return res.status(200).send({ user });
      }
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        bcryptjs
          .hash(password, 10)
          .then((hash) => {
            if (!hash) {
              throw new BadRequestError('Что-то не так с запросом');
            }
            User.create({ email, password: hash })
              // eslint-disable-next-line no-shadow
              .then((user) => {
                res.status(201).send({
                  user: {
                    name: user.name,
                    about: user.about,
                    avatar: user.avatar,
                    _id: user._id,
                    email: user.email,
                  },
                });
              })
              .catch(next);
          })
          .catch(next);
      } else {
        throw new Conflict('Пользователь уже создан');
      }
    })
    .catch(next);
};

const updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      } else {
        return res.status(200).send({ user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Что-то не так с запросом');
      }
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Что-то не так с запросом');
      }
      next(err);
    })
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      } else {
        return res.status(200).send({ user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Что-то не так с запросом');
      }
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Что-то не так с запросом');
      }
      next(err);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new Unauthorized('Пользователь не найден');
      }
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      res.send({ token });
    })
    .catch(next);
};

const getMyData = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.status(200).send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Что-то не так с запросом');
      }
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUserProfile,
  updateUserAvatar,
  login,
  getMyData,
};
