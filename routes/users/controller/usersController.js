const User = require('../model/User');

const bcrypt = require('bcryptjs');
const { isEmpty, isAlpha, isEmail, isStrongPassword } = require('validator');

const jwt = require('jsonwebtoken');

const errorHandler = require('../../../utils/errorHandler/errorHandler');
const userDecodeAndFind = require('../../../utils/userDecodeAndFind/userDecodeAndFind');
const passwordHasher = require('../../../utils/passwordHasher/passwordHasher');

async function usersGet(req, res) {
  console.log('');
  console.log('');
  console.log('          usersGet called');
  console.log('');
  console.log('');

  try {
    let payload = await user.find({});

    res.json({
      message: 'Successfully Retrieved',
      payload: payload,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed Fetching',
      error: errorHandler(err),
    });
  }
}

async function UserCreate(req, res) {
  console.log('');
  console.log('');
  console.log('          userCreate called');
  console.log('');
  console.log('');

  const { userLevel, nameFirst, nameLast, username, email, password } =
    req.body;

  console.log(req.body);

  try {
    let passwordHashed = await passwordHasher(password);

    console.log('passwordHashed', passwordHashed);

    const userCreated = new User({
      userLevel,
      nameFirst,
      nameLast,
      username,
      email,
      password: passwordHashed,
    });

    let savedUser = await userCreated.save();

    res.json({
      message: 'Successful User Creation',
      payload: savedUser,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: 'Error in Creating User',
      error: errorHandler(err),
      errMess: err.message,
    });
  }
}

async function userLogin(req, res) {
  console.log('');
  console.log('');
  console.log('          userLoginCalled');
  console.log('');
  console.log('');

  const { email, username, password } = req.body;

  reqAttr = email ? email : username;

  console.log(reqAttr);

  try {
    if (!isEmail(reqAttr)) {
      userFound = await User.findOne({
        username: username,
      });
      console.log('username ueFound', userFound);
    } else {
      userFound = await User.findOne({
        email: email,
      });
      console.log('email userFound', userFound);
    }

    console.log('Final userFound', userFound);

    if (!userFound) {
      return res.status(500).json({
        message: 'Error in Logging in User',
        error: 'Go Sign Up',
      });
    } else {
      let passwordCompare = await bcrypt.compare(password, userFound.password);

      if (!passwordCompare) {
        return res.status(500).json({
          message: 'error',
          error:
            'That does not match our records. Please review login information.',
        });
      } else {
        const {
          _id,
          email,
          nameFirst,
          nameLast,
          username,
          createdAt,
          updatedAt,
        } = userFound.password;
        let jwtToken = jwt.sign(
          {
            email,
            username,
            _id,
            firstName: nameFirst,
            lastName: nameLast,
            username: username,
            createdDate: createdAt,
            updatedLast: updatedAt,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: '2400h',
          }
        );
        return res.json({
          message: 'Success Tokenizing',
          payload: jwtToken,
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Login Error...',
      Error: errorHandler(err),
    });
  }
}

async function userProfile(req, res) {
  console.log('');
  console.log('');
  console.log('          userProfile Called');

  try {
    const dataDecoded = res.locals.dataDecoded;
    console.log(dataDecoded);

    const { _id, nameFirst, nameLast, username, createdAt, updatedAt } =
      await User.findOne({ username: dataDecoded.username });

    console.log(nameFirst, nameLast);

    res.json({
      _id: _id,
      firstName: nameFirst,
      lastName: nameLast,
      username: username,
      createdDate: createdAt,
      updatedLast: updatedAt,
    });
  } catch (err) {
    res.status(500).json({
      message: 'There is an issue in pulling your profile',
      error: errorHandler(err),
    });
  }
}

async function userUpdate(req, res) {
  console.log('');
  console.log('');
  console.log('          userUpdateCalled');
  console.log('');
  console.log('');

  console.log('req.body: ', req.body);

  console.log('res.locals.dataDecoded: ', res.locals.dataDecoded);

  let userFound = await userrDecodeAndFind(res.locals.dataDecoded);
  console.log('userFound: ', userFound);

  const { _id, email, password } = userFound;

  switch (req.body.updateType) {
    case 'email':
      if (req.body.email) {
        let emailUpdate = await user.findOneAndUpdate(
          {
            _id: _id,
          },
          { email: req.body.email },
          { new: true }
        );
      }
  }
}
