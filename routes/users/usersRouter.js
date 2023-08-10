var express = require('express');
var router = express.Router();

const { middlewareJWT } = require('./lib/middlewareJwt/middlewareJWT');

const {
  userGet,
  usersGet,
  userCreate,
  userLogin,
  userProfile,
  userUpdate,
  userrDelete,
} = require('../users/controller/usersController');
