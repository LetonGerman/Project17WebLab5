// contactController.js

// Import contact model
Message = require('./messagesModel');

// Handle index actions
exports.index = function (req, res) {
    Message.get(function (err, message) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Notes retrieved successfully",
            data: message
        });
    });
};

// Handle create contact actions
exports.new = function (req, res) {
    var message = new Message();
    message.name = req.body.name;
    message.body = req.body.body;

// save the contact and check for errors
    message.save(function (err) {
        // if (err)
        //     res.json(err);

        res.json({
            message: 'New contact created!',
            data: message
        });
    });
};

// Handle view contact info
exports.view = function (req, res) {
    Message.findById(req.params._id, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            message: 'Message details loading..',
            data: contact
        });
    });
};

// Handle update contact info
exports.update = function (req, res) {

    Message.findById(req.params._id, function (err, message) {
        if (err)
            res.send(err);

        //message.name = req.body.name;
        message.body = req.body.body;
// save the contact and check for errors
        message.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Message Info updated',
                data: message
            });
        });
    });
};

// Handle delete contact
exports.delete = function (req, res) {
    Message.deleteOne({
        _id: req.params._id
    }, function (err, message) {
        if (err)
            res.send(err);

        res.json({
            status: "success",
            message: 'Message deleted'
        });
    });
};