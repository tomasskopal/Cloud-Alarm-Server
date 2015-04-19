/**
 * Created by tomasskopal on 29.03.15.
 */

var mongoose = require('mongoose');
// var dbServer = 'mongodb://localhost:27017/cloudAlarm';
var options = {
  user: 'cloud-alarm-user',
  pass: 'V1BsB9Xg'
};
var dbServer = 'dbh62.mongolab.com:27627/heroku_app36021838';
mongoose.connect(dbServer, options);


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log("Try connect to db: " + dbServer);
    console.log("We are connected.");
});

module.exports = db;