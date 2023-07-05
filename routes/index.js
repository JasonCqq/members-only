var express = require("express");
var router = express.Router();
const passport = require("passport");
const user_controller = require("../controllers/userController");
const message_controller = require("../controllers/messageController");

/* GET home page. */
router.get("/", message_controller.show_messages);

router.post("/", message_controller.create_message_post);

router.get("/signup", function (req, res) {
  res.render("sign_up", { title: "Member Application" });
});

router.post("/signup", user_controller.create_user_post);

router.get("/joinclub", function (req, res) {
  res.render("join_club");
});

router.post("/joinclub", user_controller.give_user_membership);

router.get("/login", function (req, res) {
  res.render("log_in");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/joinclub",
    failureRedirect: "/login",
  })
);

// router.get("/log-out", (req, res, next) => {
//   req.logout(function (err) {
//     if (err) {
//       return next(err);
//     }
//     res.redirect("/");
//   });
// });

module.exports = router;
