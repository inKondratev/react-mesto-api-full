const mongoose = require("mongoose");

const likesSchema = new mongoose.Schema(
  {
    type: mongoose.Schema.Types.ObjectId,
    default:[],
  },
)

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
  },
  owner: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  },
  likes: [ likesSchema ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("card", cardSchema);
