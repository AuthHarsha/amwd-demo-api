const express = require("express");

const { saveUser } = require("../controller/registration-controller");

const router = express.Router();

router.post("/", saveUser);

module.exports = router;
