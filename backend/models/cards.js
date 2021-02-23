const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
});

const likesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    default: {},
  },
});

const dateSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
});

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /https?\:\/\/[www\.]?[\w\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]*#?/.test(
          v
        );
      },
      messege: "link error!",
    },
    owner: ownerSchema,
    likes: [likesSchema],
    createdAt: dateSchema,
  },
});

module.exports = mongoose.model("card", cardSchema);
