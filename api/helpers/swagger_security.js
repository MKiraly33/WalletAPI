const db = require('../controllers/db');

db.initCollection('loggedIn');

module.exports = {
    swaggerSecurityHandlers: {
      ApiKeyAuth: function (req, authOrSecDef, scopesOrApiKey, callback) {
        if (scopesOrApiKey) {
          if (db.getObject('loggedIn', {sessionId: scopesOrApiKey})) callback();
          else callback(new Error('Api key missing or not registered'));
          // disable to allow mock mode to work
        }
        else callback(new Error('Api key missing or not registered'));
      }
    }
  };