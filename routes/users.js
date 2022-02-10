const express = require('express');
const router = express.Router();
const AuthController = require('../src/user.controller')

router.post("/signup", AuthController.Signup)
router.post("/login", AuthController.Login)
router.post("/reset", AuthController.Reset)

module.exports = router
