const router = require('express').Router();
const { createUser } = require('../controllers/users');
// eslint-disable-next-line import/order
const { celebrate, Joi } = require('celebrate');

router.post('/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().min(4).max(30),
      password: Joi.string().required().min(6).max(15),
    }),
  }),
  createUser);

module.exports = router;
