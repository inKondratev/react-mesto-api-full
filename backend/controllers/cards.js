const Card = require("../models/cards");
const NotFoundError = require("../errors/notFoundError");
const BadRequestError = require("../errors/badRequest");

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        throw new BadRequestError("Что-то не так с запросом");
      }
      res.status(200).send(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner:{_id:req.user._id }})
    .then((card) => {
      if (!card) {
        throw new BadRequestError("Что то не так с запросом");
      }
      res.status(201).send(card);
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { id } = req.body;
  Card.findByIdAndRemove(id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Карточка не найдена");
      } else {
        return res.status(200).send(card);
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Карточка не найдена");
      } else {
        return res.status(200).send({ data: card });
      }
    })
    .catch(next);
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Карточка не найдена");
      } else {
        return res.ststus(500).send({ messege: `${err.messege}` });
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
