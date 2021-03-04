const Card = require("../models/cards");
const NotFoundError = require("../errors/notFoundError");
const BadRequestError = require("../errors/badRequest");
const Conflict = require("../errors/Conflict");

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
      if (err.name === "ValidationError") {
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
      if(card){
        if (card.owner._id == req.user._id) {
          Card.findByIdAndRemove(id)
            .then((card) => {
              if (!card) {
                throw new NotFoundError("Карточка не найдена");
              } else {
                return res.status(200).send(card);
              }
            })
            .catch((err) => {
              if (err.name === "CastError") {
                throw new NotFoundError("Карточка не найдена");
              }
              next(err);
            });
        } else {
          throw new Conflict("Нельзя удалить чужую карточку");
        }
      }else{
        throw new NotFoundError("Карточка не найдена");
      }

    })
    .catch((err) => {
      if (err.name === "CastError") {
        throw new BadRequestError("Карточка не найдена");
      }
      next(err);
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const { id } = req.params;

  Card.findById(id)
    .then((card)=>{
      if(card){
        Card.findByIdAndUpdate(id, { $addToSet: { likes: req.user } }, { new: true })
        .then((card) => {
          if (!card) {
            throw new NotFoundError("Карточка не найдена");
          } else {
            return res.status(200).send(card);
          }
        })
        .catch((err) => {
          if (err.name === "CastError") {
            throw new BadRequestError("Что-то не так с запросом");
          }
        })
        .catch(next);
      }else{
        throw new BadRequestError("Что-то не так с запросом");
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        throw new BadRequestError("Что-то не так с запросом");
      }
    })
    .catch(next);

};

const dislikeCard = (req, res) => {
  const { id } = req.params;
  Card.findById(id)
    .then((card)=>{
        Card.findByIdAndUpdate(id, { $pull: { likes: req.user._id } }, { new: true })
      .then((card) => {
        if (!card) {
          throw new NotFoundError("Карточка не найдена");
        } else {
          return res.status(200).send(card);
        }
      })
      .catch((err) => {
        if (err.name === "CastError") {
          throw new BadRequestError("Что-то не так с запросом");
        }
      })
      .catch(next);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        throw new BadRequestError("Что-то не так с запросом");
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
