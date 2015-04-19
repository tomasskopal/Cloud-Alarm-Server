/**
 * Created by tomasskopal on 29.03.15.
 */

var mongoose = require('mongoose');
var dbServer = 'mongodb://localhost:27017/cloudAlarm';
mongoose.connect(dbServer);


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log("Try connect to db: " + dbServer);
    console.log("We are connected.");
});

module.exports = db;