const User = require("../models/users");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const NotFoundError = require("../errors/notFoundError");
const BadRequestError = require("../errors/badRequest");

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) {
        throw new BadRequestError("Что-то не так с запросом");
      }
      res.status(200).send({ data: users });
    })
    .catch(next);
};
const getUser = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Пользователь не найден!");
      } else {
        return res.status(200).send({ data: user });
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
              throw new BadRequestError("Что-то не так с запросом");
            }
            User.create({ email: email, password: hash })
              .then((user) => {
                if (!user) {
                  throw new BadRequestError("Что-то не так с запросом");
                }
                res.status(201).send({ data: user });
              })
              .catch(next);
          })
          .catch(next);
      } else {
        throw new BadRequestError("Пользователь уже создан");
      }
    })
    .catch(next);
};

const updateUserProfile = (req, res, next) => {
  const { id } = req.params;
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    }
  )
    .then((user) => {
      if (!user) {
        throw new BadRequestError("Что-то не так с запросом");
      } else {
        return res.status(200).send({ data: user });
      }
    })
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const { id } = req.params;
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    }
  )
    .then((user) => {
      if (!user) {
        throw new BadRequestError("Что-то не так с запросом");
      } else {
        return res.status(200).send({ data: user });
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Пользователь не найден");
      }
      const token = jwt.sign({ _id: user._id }, "some-secret-key", {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch(next);
};

const getMyData = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Пользователь не найден");
      }
      res.status(200).send({ data: user });
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
