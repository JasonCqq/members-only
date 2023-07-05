const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Message = require("../models/messageModel");

exports.create_message_post = [
  body("title", "Title must be between 3-50 characters")
    .trim()
    .isLength({ min: 3, max: 50 })
    .escape(),
  body("text", "Text must be at least 1 character")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!req.user) {
      return;
    }

    if (!errors.isEmpty()) {
      res.render("/", {
        errors: errors.array().map((error) => error.msg),
      });
    } else {
      const message = new Message({
        title: req.body.title,
        text: req.body.text,
        timestamp: new Date(),
        author: req.user._id,
      });

      await message.save();
      res.redirect("/");
    }
  }),
];
