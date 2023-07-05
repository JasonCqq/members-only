var express = require("express");
var router = express.Router();
const passport = require("passport");
const user_controller = require("../controllers/userController");

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "Express" });
});

router.get("/signup", function (req, res) {
  res.render("sign_up", { title: "Member Application" });
});

router.get("/joinclub", function (req, res) {
  res.render("join_club");
});

router.post("/signup", user_controller.create_user_post);

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
