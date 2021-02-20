const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { PORT = 3000 } = process.env;
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");
const { celebrate, Joi, errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();

app.use(requestLogger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use(cors());
app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().min(4).max(15),
      password: Joi.string().required().min(6),
    }),
  }),
  createUser
);
app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().min(4).max(15),
      password: Joi.string().required().min(6),
    }),
  }),
  login
);

app.use(auth);

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use("*", (req, res) => {
  res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
