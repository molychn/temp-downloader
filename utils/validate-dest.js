const exists = require('fs').existsSync;
const path = require('path');

const validateDest = (src) => {
  let dest = path.resolve('.', src);

  return exists(dest);
};

module.exports = validateDest;
