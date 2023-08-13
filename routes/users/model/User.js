mongoose = require('mongoose');

const {
  isAlpha,
  isEmail,
  isStrongPassword,
  isAlphanumeric,
} = require('validator');

const userSchema = new mongoose.Schema(
  {
    nameFirst: {
      type: String,
      required: true,
      validate: [isAlpha, 'Only letters in the First Name'],
    },
    nameLast: {
      type: String,
      required: true,
      validate: [isAlpha, 'Only letters in the Last Name'],
    },
    username: {
      type: String,
      required: true,
      unique: true,
      validate: [isAlphanumeric, 'Username must be alphanumeric'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [
        isEmail,
        'Email must be a valid email. ThisIs@vValidEmail.com',
      ],
    },
    password: {
      type: String,
      validate: [
        isStrongPassword,
        'Make A Stronger Password. (At least one NUMBER & on SPECIAL CHARACTER & one UPPERCASE LETTER & one LOWERCASE LETTER, with at least 8 characters in total.',
      ],
    },
    userLevel: {
      type: String,
      enum: ['basic', 'subscription', 'Adm!n'],
      default: 'basic',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('user', userSchema);
