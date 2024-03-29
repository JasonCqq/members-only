const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

exports.create_user_post = [
  body("email", "Invalid email address")
    .trim()
    .isLength({ min: 3 })
    .isEmail()
    .escape(),
  body("password", "Password must be between 8-20 characters")
    .trim()
    .isLength({ min: 8, max: 20 })
    .escape(),
  body("confirmPassword", "Passwords do not match")
    .trim()
    .isLength({ min: 8, max: 20 })
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    })
    .escape(),
  body("fullName", "Full name must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("admin").trim().escape(),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("sign_up", {
        errors: errors.array().map((error) => error.msg),
      });
    } else {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ error: "Error hashing password" });
        }

        let adminAccess;
        if (req.body.admin === "yes") {
          adminAccess = true;
        } else if (req.body.admin !== "yes") {
          adminAccess = false;
        }

        const user = new User({
          username: req.body.email,
          password: hashedPassword,
          fullName: req.body.fullName,
          membershipStatus: false,
          admin: adminAccess,
        });

        await user.save();
        res.redirect("/");
      });
    }
  }),
];

exports.give_user_membership = asyncHandler(async (req, res) => {
  const userCode = req.body.password;
  if (userCode !== "letmein") {
    res.render("join_club", { message: "Wrong code." });
  }

  await User.findByIdAndUpdate(req.user._id, { membershipStatus: true }).exec();

  res.redirect("/");
});
