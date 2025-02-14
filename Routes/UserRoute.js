const express = require("express");
const router = express.Router();
const { getCurrentUser } = require("../Controllers/UserController");
const { userVerification } = require("../Middlewares/AuthMiddleware");

router.get("/current-user", userVerification, getCurrentUser);

module.exports = router;
