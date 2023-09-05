// bringin bcrypt to add some salt and hash together and encrypt passowrd
const bcrypt = require('bcrypt');

// create async function due to awaits from bcrypt hashing
async function passwordHasher(password) {
  // display function called
  console.log('');
  console.log('');
  console.log('          passwordHasher Called');
  console.log('');
  console.log('');

  // declare and define salt with a auto encryption from bcrypt
  let salt = await bcrypt.genSalt(10);

  //  declare and define passwordHashed with a combo of salt and password
  let passwordHashed = await bcrypt.hash(password, salt);

  //   display hashed password  in console
  console.log('passwordHasher: ' + passwordHashed);

  return passwordHashed;
}

// SEND IT!
module.exports = passwordHasher;
