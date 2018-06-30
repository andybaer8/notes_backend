const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const config             = require('./config/config');
const app            = express();

app.use(bodyParser.urlencoded({ extended: true }));
MongoClient.connect(config.db_url, (err, database) => {
  if (err) {return console.log(err)}
                      
  // Make sure you add the database name and not the collection name
  db = database.db("backendtest")
  require('./app/routes')(app, db);
  app.listen(config.port, () => {
    console.log('We are live on ' + config.port);
  });               
})