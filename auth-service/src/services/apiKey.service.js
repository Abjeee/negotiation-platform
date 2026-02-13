const { v4: uuidv4 } = require('uuid');

exports.generateApiKey = () => {
  return 'api_' + uuidv4().replace(/-/g, '');
};
