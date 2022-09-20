const fs = require('fs');
const path = require('path');

function postBuild() {
  fs.copyFileSync(
    path.join(__dirname, 'package.json'),
    path.join(__dirname, 'public')
  );
  fs.copyFileSync(
    path.join(__dirname, 'package-lock.json'),
    path.join(__dirname, 'public')
  );
}

postBuild();
