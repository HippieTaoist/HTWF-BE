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

  console.log(req.username);
  try {
    let payload = await User.find({ username: req.username });

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

async function userGet(req, res) {
  console.log('');
  console.log('');
  console.log('          userGet Called');
  console.log('');
  console.log('');

  try {
    console.log(req.params);
    let payload = await User.findOne({
      username: req.params.username,
    });
    console.log(payload);

    res.json({
      message: 'Successfully Retrieved!!',
      payload: payload,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed Fetching',
      message: errorHandler(err),
    });
  }
}

async function userCreate(req, res) {
  console.log('');
  console.log('');
  console.log('          userCreate called');
  console.log('');
  console.log('');

  const { nameFirst, nameLast, username, email, password, userLevel } =
    req.body;

  console.log('Step 1 - req.body', req.body);
  let passwordHashed = await passwordHasher(password);
  console.log('step 2 - passwordHashed', passwordHashed);

  try {
    console.log('step 3 - create user PWH', password, passwordHashed);
    const userCreated = new User({
      nameFirst,
      nameLast,
      username,
      email,
      password: passwordHashed,
      userLevel,
    });

    let savedUser = await userCreated.save();
    console.log('savedUser.password: ' + savedUser.password);

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

  const { signIn, password } = req.body;
  console.log('signIn' + signIn, 'password' + password);

  // reqAttr = isEmail(signIn) ? email : username;

  try {
    if (!isEmail(signIn)) {
      userFound = await User.findOne({
        username: signIn,
      });
      console.log('username ueFound', userFound);
    } else {
      userFound = await User.findOne({
        email: signIn,
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
      console.log('usf', userFound);
      console.log('password', password);
      console.log('userFound.password', userFound.password);
      let passwordCompare = await bcrypt.compare(password, userFound.password);

      console.log('passwordcompare', passwordCompare);

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
  console.log('');
  console.log('');

  try {
    const dataDecoded = res.locals.dataDecoded;
    console.log(dataDecoded);

    const { _id, nameFirst, nameLast, username, createdAt, updatedAt } =
      await User.findOne({ username: dataDecoded.username });

    console.log(nameFirst, nameLast);

    res.json({
      _id: _id,
      nameFirst,
      nameLast,
      username,
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

  let userFound = await userDecodeAndFind(res.locals.dataDecoded);
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

        console.log(emailUpdate);
        console.log(email);
        res.json({ payload: emailUpdate });
      }
      break;

    case 'password':
      if (req.body.password && req.body.passwordCompare) {
        console.log(req.body.password, '||', req.body.passwordCompare);

        try {
          if (
            req.body.passwordCompare === req.body.password &&
            req.body.password !== password &&
            isStrongPassword(req.body.password)
          ) {
            console.log('My Password is so strong!');

            let passwordHashed = await passwordHasher(req.body.password);
            console.log('passwordHashed: ' + passwordHashed);

            console.log('_id', _id);
            let passwordUpdate = await User.findOneAndUpdate(
              {
                _id: _id,
              },
              {
                password: passwordHashed,
              },
              {
                new: true,
              }
            );

            console.log('passwordUpdate: ', passwordUpdate);
            res.json({
              passwordUpdate,
            });
          } else {
            res.status(500).json({
              message: 'There is and issue with your password',
            });
          }
        } catch (error) {
          res.status(500).json({
            message: 'An error has occurred on your update!',
          });
        }
      }
      break;

    default:
      console.log('Not sure what to default yet');
      break;
  }
}

async function userDelete(req, res) {
  console.log('');
  console.log('');
  console.log('          userDelete Called');
  console.log('');
  console.log('');

  console.log('req.body: ', req.body);

  console.log('res.locals.dataDecoded: ', res.locals.dataDecoded);

  let userFound = await userDecodeAndFind(res.locals.dataDecoded);
  console.log('userFound: ', userFound);

  const { _id, email, password } = userFound;

  let userDeletePasswordCheck = await bcrypt.compare(
    req.body.password,
    password
  );

  let userDeleteDoubleCheck = req.body.doubleChecked;

  console.log(userDeletePasswordCheck);
  console.log(userDeleteDoubleCheck);

  User.deleteOne({
    _id: _id,
  }).then(console.log(`User has been deleted and declared ${userFound}`));
  res.json({
    message: 'user deleted successfully',
  });
}

module.exports = {
  usersGet,
  userGet,
  userCreate,
  userLogin,
  userProfile,
  userUpdate,
  userDelete,
};
