var express = require("express");
var router = express.Router();
const user_controller = require("../controllers/userController");

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "Express" });
});

router.get("/signup", function (req, res) {
  res.render("sign_up", { title: "Member Application" });
});

router.post("/signup", user_controller.create_user_post);

module.exports = router;
