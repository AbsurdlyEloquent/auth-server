const jwt = require('jsonwebtoken')

const options = {
  expiresIn: "1h"
}

async function generateJwt(username, admin) {
  try {
    const payload = {username: username, admin: admin}
    const token = await jwt.sign(payload, process.env.JWT_SECRET, options)
    return { error: false, token: token }
  } catch (error) {
    return { error: true }
  }
}

module.exports = generateJwt
