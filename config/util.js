const path = require('path');

const root = process.cwd();

function resolve(...paths) {
  return path.join(root, ...paths);
}

module.exports = { resolve, root };
