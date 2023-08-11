const bcrypt = require('bcrypt');

async function passwordHasher(password) {
  console.log('');
  console.log('');
  console.log('          passwordHasher Called');
  console.log('');
  console.log('');

  let salt = await bcrypt.genSalt(10);
  let passwordHasher = await bcrypt.hash(password, salt);

  console.log(passwordhashed);
}

module.exports = passwordHasher;
