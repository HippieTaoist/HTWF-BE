// bring in model to compare against
const User = require('../../routes/users/model/User');

// setup async function due to the await within
async function userDecodeAndFind(data) {
  // display function called and data transferred in console
  console.log('');
  console.log('');
  console.log('          userDecodeAndFindCalled');
  console.log('');
  console.log('');
  console.log('decodedData: ', data);

  //   declare email and username and pull them from 'data'
  const { email, username } = data;

  //display email and username in console
  console.log(email);
  console.log(username);

  //   declare userFound and define it with the user found in database
  let userFound = await User.findOne({ username });

  return userFound;
}

module.exports = userDecodeAndFind;

module.exports = userDecodeAndFind;
