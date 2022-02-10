const Joi = require("joi");
const jwt = require("jsonwebtoken")
const User = require('../user/user.model')
const generateJwt = require('./generateJwt')

const tokenSecret = process.env.JWT_SECRET

const userSchema = Joi.object().keys({
  username: Joi.string().min(3).max(15).required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  admin: Joi.boolean().required()
})

exports.Signup = async (req, res) => {
  try {
    const result = userSchema.validate(req.body);
    if (result.error) {
      console.log(result.error.message)
      return res.json({
        error: true,
        status: 400,
        message: result.error.message
      })
    }

    let user = await User.find(result.value.username)

    if (user) {
      return res.json({
        error: true,
        message: "User already registered"
      })
    }

    const hash = await User.hashPassword(result.value.password)
    delete result.value.confirmPassword
    result.value.password = hash

    const newUser = new User(result.value.username, result.value.password, result.value.admin)
    newUser.save()

    return res.status(200).json({
      success: true,
      message: "Registration Success",
    })

  } catch (error) {
    console.error("Signup Error", error);
    return res.status(500).json({
      error: true,
      message: "Cannot Register",
    })
  }
}

exports.Login = async (req, res)=>{
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({
        error: true,
        message: "Cannot authorize user"
      })
    }

    const user = await User.find(username)

    if (!user) {
      return res.status(404).json({
        error: true,
        message: "Account not found"
      })
    }

    const isValid = await User.comparePasswords(password, user.password)

    if (!isValid) {
      return res.status(400).json({
        error: true,
        message: "Invalid credentials",
      })
    }

    const {error, token } = await generateJwt(user.username, user.admin)
    if (error) {
      return res.status(500).json({
        error: true,
        message: "Couldn't create access token. Please try again later"
      })
    }

    res.cookie('authToken', token, {
      httpOnly: true,
    })

    return res.send({
      user: user.username,
      success: true,
      message: "User logged in successfully"
    })
  } catch (err) {
    console.error("Login error", err);
    return res.status(500).json({
      error: true,
      message: "Couldn't log in, please try again later."
    })
  }
}

exports.Reset = async (req, res)=>{
  try {
    const token = req.cookies.authToken

    const result = jwt.verify(token, tokenSecret, (err, decoded)=>{
      if (err) {
        return err
      }
      return {
        username: decoded.username,
        status: true
      }
    })

    if (result.status) {
      const user = await User.find(result.username)
    }
  } catch (error) {
    console.error("Password Reset Error", error)
    return res.status(500).json({
      error: true,
      message: "Unable to process request"
    })
  }
}
