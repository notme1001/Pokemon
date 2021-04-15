const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.authorized = (req, res, next) => {
  const tokenHeader = req.headers.authorization

  if (!tokenHeader) {
    return res.json({
        err: true,
        msg: 'Token is not defined'
    })
  }

  const token = tokenHeader.slice(7, tokenHeader.length)
  if (token) {
    jwt.verify(token, process.env.JWTPASS || 'jwtPass', (err, result) => {
      if (err) {
        return res.json({
            err: true,
            msg: 'Unauthorized'
        })
      }
      req.userData = result
      next()
    })
  }
}