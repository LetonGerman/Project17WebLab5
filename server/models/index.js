//import mongoose from 'mongoose';
const mongoose = require('mongoose');
const User = require('./Users');
const Message = require('./messages');

const connectDb = () => {
    return mongoose.connect("mongodb+srv://project17:Tui3gmQb9xBmL9V3@mdeditor-cs1cq.mongodb.net/test?retryWrites=true");
};

const models = { User, Message };

module.exports = models;