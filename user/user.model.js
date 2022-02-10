const fs = require('fs')
const bcrypt = require('bcryptjs')
const path = require('path')

class User {
  constructor(username, password, admin) {
    this.username = username
    this.password = password
    this.admin = admin
  }

  save() {
    let credentials = require('../credentials.json')
    let newUser = {
      username: this.username,
      password: this.password,
      admin: this.admin
    }
    credentials.push(newUser)
    fs.writeFile('./credentials.json', JSON.stringify(credentials), (err)=>{if (err) console.log(err)})
  }

  static find(username) {
    let credentials = require('../credentials.json')
    let user = credentials.find((user) => {
      return user.username === username
    })
    return user
  }

  static remove(username) {
    let credentials = require('../credentials.json')
    let userIndex = credentials.findIndex((user)=>{
      return user.username === username
    })
    let removed = credentials.splice(userIndex, 1)
    fs.writeFile('./credentials.json', JSON.stringify(credentials), (err)=>{if (err) console.log(err)})
    return removed
  }

  static async hashPassword(password) {
    try {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      throw new Error("Hashing failed", error)
    }
  }

  static async comparePasswords(password, hash) {
    const match = await bcrypt.compare(password, hash)
    return match
  }
}

module.exports = User
