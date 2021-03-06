const express = require('express');
const router = express.Router();
const AuthController = require('../src/user.controller')

router.post("/signup", AuthController.Signup)
router.post("/delete", AuthController.Delete)

module.exports = router
