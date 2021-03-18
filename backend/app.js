const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { PORT = 3000 } = process.env;
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const signupRouter = require('./routes/signup');
const signinRouter = require('./routes/signin');
const auth = require("./middlewares/auth");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const cors = require("cors");
const errorMiddlewares = require("./middlewares/checkErrors");
const NotFoundError = require("./errors/notFoundError");

const app = express();

app.use(requestLogger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
app.use(cors());
app.use("/", signupRouter)
app.use("/", signinRouter)


app.use("/users", auth, usersRouter);
app.use("/cards", auth, cardsRouter);

app.use("*", (req, res) => {
  throw new NotFoundError("Запрашиваемый ресурс не найден");
});

app.use(errorLogger);

app.use(errorMiddlewares);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

