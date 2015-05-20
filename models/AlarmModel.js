/**
 * Created by tomasskopal on 29.03.15.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema; // schema odpovida kolekci ~ tabulka v relacnich dtb

var AlarmSchema = new Schema({
    _id: Number,
    title: String,
    target: String,
    enabled: Boolean,
    repeat: [Number],
    userId: String,
    removed: Boolean,
    lastChanged: String
});

module.exports = mongoose.model('Alarm', AlarmSchema); // model odpovida dokumentu ~ radek v tabulce
