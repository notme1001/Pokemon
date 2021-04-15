const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.encrypt = (pass) => {
  return bcrypt.hashSync(pass, 12)
}

exports.compare = (pass1, pass2) => {
  return bcrypt.compareSync(pass1, pass2)
}

exports.signJwt = (value) => {
  return jwt.sign({
    expiresIn: '1h',
    data: value
  }, process.env.JWTPASS || 'jwtPass')
}