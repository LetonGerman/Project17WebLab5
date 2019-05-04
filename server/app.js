const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const uuidv4 = require('uuid/v4');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const apiRouter = require('./routes/api-routes');

const app = express();

app.use(logger('dev'));
app.use(cors());
cors({credentials: true, origin: true});
var allowedOrigins = ['http://localhost:8080', 'http://localhost:8080'];
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('minimal'));

mongoose.connect('mongodb+srv://project17:Tui3gmQb9xBmL9V3@mdeditor-cs1cq.mongodb.net/test?retryWrites=true');

const db = mongoose.connection;

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/contacts', apiRouter);

module.exports = app;
