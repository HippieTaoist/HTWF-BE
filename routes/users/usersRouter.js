var express = require('express');
var router = express.Router();

const { middlewareJwt } = require('./lib/middlewareJwt/middlewareJWT');

const {
  userGet,
  usersGet,
  userCreate,
  userLogin,
  userProfile,
  userUpdate,
  userDelete: userDelete,
} = require('../users/controller/usersController');

router.get('/', middlewareJwt, usersGet);

router.get('/user-get/:username', middlewareJwt, userGet);

router.post('/user-create', userCreate);

router.post('/user-login', userLogin);

router.get('/user-profile', middlewareJwt, userProfile);

router.put('/user-update', middlewareJwt, userUpdate);

router.delete('/user-delete/:_id', middlewareJwt, userDelete);

module.exports = router;
