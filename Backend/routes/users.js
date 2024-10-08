const express = require("express");

const router = express.Router();

const user_controller = require("../controllers/user_controller");

router.post("/login", user_controller.login);

router.post("/signup", user_controller.signupUser);

router.post("/delete", user_controller.deleteUser);

router.post("/changePassword", user_controller.changePassword);

module.exports = router;
