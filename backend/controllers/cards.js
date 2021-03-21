const Card = require('../models/cards');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequest');
const Conflict = require('../errors/Conflict');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: { _id: req.user._id } })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(err);
      } else {
        next(err);
      }
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { id } = req.params;
  Card.findById(id)
    .then((card) => {
      // eslint-disable-next-line eqeqeq
      if (card.owner._id == req.user._id) {
        Card.findByIdAndRemove(id)
          // eslint-disable-next-line no-shadow
          .then((card) => {
            if (!card) {
              throw new NotFoundError('Карточка не найдена');
            } else {
              return res.status(200).send(card);
            }
          })
          .catch((err) => {
            if (err.name === 'CastError') {
              throw new NotFoundError('Карточка не найдена');
            }
            next(err);
          });
      } else {
        throw new Conflict('Нельзя удалить чужую карточку');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Что-то не так с запросом');
      }
      throw new NotFoundError('Карточка не найдена');
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const { id } = req.params;

  Card.findById(id)
    .then(() => {
      Card.findByIdAndUpdate(
        id,
        { $addToSet: { likes: req.user._id } },
        { new: true },
      )
        .then((card) => {
          if (!card) {
            throw new NotFoundError('Карточка не найдена');
          } else {
            return res.status(200).send(card);
          }
        })
        .catch((err) => {
          if (err.name === 'CastError') {
            throw new BadRequestError('Что-то не так с запросом');
          }
          next(err);
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Что-то не так с запросом');
      }
      throw new NotFoundError('Карточка не найдена');
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const { id } = req.params;
  Card.findById(id)
    .then(() => {
      Card.findByIdAndUpdate(
        id,
        { $pull: { likes: req.user._id } },
        { new: true },
      )
        .then((card) => {
          if (!card) {
            throw new NotFoundError('Карточка не найдена');
          } else {
            return res.status(200).send(card);
          }
        })
        .catch((err) => {
          if (err.name === 'CastError') {
            throw new BadRequestError('Что-то не так с запросом');
          }
          throw new NotFoundError('Карточка не найдена');
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Что-то не так с запросом');
      }
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
