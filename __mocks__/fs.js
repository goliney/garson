import path from 'path';

const fs = jest.genMockFromModule('fs');

// This is a custom function that our tests can use during setup to specify
// what the files on the "mock" filesystem should look like when any of the
// `fs` APIs are used.
let mockFiles = Object.create(null);
function __setMockFiles(newMockFiles) {
  mockFiles = newMockFiles;
}

// A custom version of `readdir` that reads from the special mocked out
// file list set via __setMockFiles
function readdir(source) {
  if (path.extname(source)) {
    // eslint-disable-next-line no-throw-literal
    throw { code: 'ENOTDIR' };
  }
  const pathTokens = source.split('/');
  return Object.keys(
    pathTokens.reduce((acc, pathToken) => {
      return acc && acc[pathToken] ? acc[pathToken] : {};
    }, mockFiles)
  );
}

fs.__setMockFiles = __setMockFiles;
fs.readdir = readdir;

module.exports = fs;
