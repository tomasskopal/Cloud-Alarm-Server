/**
 * Created by tomasskopal on 04.04.15.
 */

var mongoose = require('mongoose');

// Define our token schema
var TokenSchema   = new mongoose.Schema({
    value: { type: String, required: true, unique: true },
    userId: { type: String, required: true, unique: true }
});

// Export the Mongoose model
module.exports = mongoose.model('Token', TokenSchema);
