const jwt = require('jsonwebtoken');

function middlewareJwt(req, res, next) {
  try {
    // console.log(req.headers);
    if (req.headers && req.headers.authorization) {
      let tokenNotDecoded = req.headers.authorization;
      // console.log('middlewareJwt: tokenNotDecoded: ', tokenNotDecoded);

      let tokenSliced = tokenNotDecoded.slice(7);
      // console.log('middlewareJwt: tokenSliced: ', tokenSliced);

      let tokenDecoded = jwt.verify(tokenSLiced, process.env.SECRET_KEY);
      // console.log('middlewareJwt: tokenDecoded: ', tokenDecoded);

      res.local.dataDecoded = tokenDecoded;
      // console.log('middlewareJwt:res.locals.dataDecoded: ', res.local.dataDecoded);

      next();
      // console.log(`middlewareJwt:res.locals:${res.locals}`);
    } else {
      throw {
        message: 'Error, Ware? Middle of Jwt',
      };
    }
  } catch (err) {
    res.status(500).json({
      message: 'Authentication Denied!',
      error: err.message,
    });
  }
}

module.exports = { middlewareJwt };
