const express = require("express");
const router = express.Router();
const { register, login, challenge, verify } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/challenge", challenge);
router.post("/verify", verify);

module.exports = router;
