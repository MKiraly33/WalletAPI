'use strict';

var swaggerSecurity = require('./api/helpers/swagger_security.js');
var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var cors = require('cors');

module.exports = app; // for testing

var config = {
  appRoot: __dirname, // required config
  swaggerSecurityHandlers: swaggerSecurity.swaggerSecurityHandlers
};

app.use(cors());

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);
});
