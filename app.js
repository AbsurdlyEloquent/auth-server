const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const AuthController = require('./src/user.controller')
const fs = require('fs')
require('dotenv').config()

const tokenSecret = process.env.JWT_SECRET

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // limit each IP to 100 requests per windowMs
  message: {
    status: 'fail',
    message: 'Too many requests, please try again later',
  },
});

const jwtVerify = (req, res) => {
  const token = req.cookies.authToken;

  return jwt.verify(token, tokenSecret, (err, decoded) => {
    if (err) {
      // e.g malformed token, bad signature etc - clear the cookie also
      return err
    }
    return {
      username: decoded.username,
      admin: decoded.admin,
      status: true
    }
  });
};

app.use(cookieParser());

app.use(express.static('static'))

app.get('/', async (req, res)=> {
  let vari = await jwtVerify(req, res)
  if (vari.status) {
    return res.sendFile('./www/index.html', { root: __dirname })
  } else {
    return res.redirect('/login')
  }
})

app.get('/ip-data', async (req, res)=> {
  let vari = await jwtVerify(req, res)
  if (vari.status) {
    return res.sendFile('./www/ip-data.html', { root: __dirname })
  } else {
    return res.redirect('/login')
  }
})

app.get('/ip-data/json', async (req, res)=> {
  let vari = await jwtVerify(req, res)
  if (vari.status) {
    const ip = require('./ip.json')
    const port = require('./port.json')
    const data = {...ip, ...port}
    return res.json(data)
  } else {
    return res.status(401)
  }
})

app.post('/ip-data', async (req, res)=> {
  let vari = await jwtVerify(req, res)
  if (vari.status) {
    if (req.body.type === 'ip') {
      let ip = {
        address: req.body.address,
        netmask: req.body.netmask,
        gateway: req.body.gateway
      }
      fs.writeFile('./ip.json', JSON.stringify(ip), (err)=>{ if (err) {console.log(err)}})
      return res.status(200).json({
        success: true
      })
    } else if (req.body.type === 'port') {
      let port = {
        inbound: req.body.inbound,
        outbound: req.body.outbound
      }
      fs.writeFile('./port.json', JSON.stringify(port), (err)=>{if (err) {console.log(err)}})
      return res.status(200).json({
        success: true
      })
    } else {
      return res.status(500)
    }
  } else {
    return res.status(401)
  }
})

app.get('/logs', async (req, res)=> {
  let vari = await jwtVerify(req, res)
  if (vari.status) {
    return res.sendFile('./www/logs.html', { root: __dirname })
  } else {
    return res.redirect('/login')
  }
})

app.get('/logs/ids', async (req, res)=> {
  let vari = await jwtVerify(req, res)
  if (vari.status) {
    res.sendFile('./ids.csv', { root: __dirname })
  } else {
    return res.status(401)
  }
})

app.get('/logs/bandwidth', async (req, res)=> {
  let vari = await jwtVerify(req, res)
  if (vari.status) {
    res.sendFile('./bandwidth.csv', { root: __dirname })
  } else {
    return res.status(401)
  }
})

app.get('/account', async (req, res)=> {
  let vari = await jwtVerify(req, res)
  if (vari.status) {
    if (vari.admin) {
      return res.sendFile('./www/admin.html', { root: __dirname })
    } else {
      return res.sendFile('./www/account.html', { root: __dirname })
    }
  } else {
    return res.redirect('/login')
  }
})

app.get('/login', (req, res)=>{
  return res.sendFile('./www/login.html', { root: __dirname })
})

app.get('/logout', (req, res)=> {
  res.clearCookie('authToken')
  return res.redirect('/login')
})

app.post('/users/login', AuthController.Login)
app.post('/users/reset', AuthController.Reset)

app.use('/users', async (req, res, next)=> {
    let vari = await jwtVerify(req, res)
    if (vari.status) {
      next()
    } else {
      return res.status(401)
    }
})

app.use('/users', require('./routes/users'))

app.listen(PORT, ()=>{
  console.log(`Server initialized on port: ${PORT}`)
})
