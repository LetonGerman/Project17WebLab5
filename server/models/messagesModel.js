// contactModel.js

var mongoose = require('mongoose');

// Setup schema
var contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
});

// Export Message model
var Message = module.exports = mongoose.model('mdnotes', contactSchema);

module.exports.get = function (callback, limit) {
    Message.find(callback).limit(limit);
}