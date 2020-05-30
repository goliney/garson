const util = jest.genMockFromModule('util');

function promisify(callback) {
  return callback;
}

util.promisify = promisify;

module.exports = util;
