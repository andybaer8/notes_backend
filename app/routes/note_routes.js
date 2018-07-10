reqUtils = require('../utils/reqUtils');
module.exports = function(app, db) {

var methods = reqUtils.methodListing;
for (var i = 0; i < methods.length; i++) {
  app.all('/'+methods[i].name, methods[i].serverFunction);
}
};