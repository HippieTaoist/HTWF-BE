function errorMessageParser(err) {
  let output;

  try {
    let objectKeys = Object.keys(err.keyPattern);
    let objectValue = object.values(err.keyValue);
    output = `${objectKeys[0]} ${objectValue[0]}}`;
  } catch (e) {
    output = 'Something went wrong, Contact support.';
  }
  return output;
}

function errorHandler(err) {
  let message = '';

  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = errorMessageParser(err);
        break;
      default:
        message = 'Something went wrong, Contact support.';
    }
  } else if (err.message) {
    return err.message;
  }
}

module.exports = errorHandler;
