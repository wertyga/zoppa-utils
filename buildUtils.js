const path = require('path');

function getPathFromArgs() {
  const pathFolder = process.argv.find(arg => arg.includes('path='));
  if (!pathFolder) {
    console.error('No provided path argument');
    process.exit(1);
  }

  return path.join(__dirname, pathFolder.replace('path=', ''));
}

module.exports = {
  getPathFromArgs,
};
