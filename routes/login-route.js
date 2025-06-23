const express = require("express");

const { searchUser } = require("../controller/login-controller");

const router = express.Router();

router.post("/", searchUser);

module.exports = router;
