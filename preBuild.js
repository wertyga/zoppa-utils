const rimraf = require('rimraf');
const { getPathFromArgs } = require('./buildUtils');

-(function () {
  try {
    const folder = getPathFromArgs();
    rimraf.sync(folder);
  } catch (e) {
    console.log(e);
  }
})();
