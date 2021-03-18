const router = require("express").Router();
const {
  getUsers,
  getUser,
  updateUserProfile,
  updateUserAvatar,
  getMyData,
} = require("../controllers/users");
const { celebrate, Joi } = require("celebrate");

router.get(
  "/",
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().alphanum().length(24),
    }),
  }),
  getUsers
);
router.get("/me", getMyData);
router.get(
  "/:id",
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().alphanum().length(24),
    }),
  }),
  getUser
);
router.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(1).max(20),
      about: Joi.string().required().min(1).max(70),
    }),
    params: Joi.object().keys({
      id: Joi.string().alphanum().length(24),
    }),
  }),

  updateUserProfile
);
router.patch(
  "/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .required()
        .min(5)
        .regex(
          /https?\:\/\/[www\.]?[\w\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]*#?/
        ),
    }),
  }),
  updateUserAvatar
);

module.exports = router;
