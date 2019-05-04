var express = require('express');
var router = express.Router();
var uuidv4 = require('uuid/v4');
let cors = require('cors');

const postbase = require('../database/postbase');
const notesController = require('../models/messages');

/*router.use((req, res, next) => {
    req.context = {
        postbase
    };
    next();
});*/
router.use(cors());

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.route('/')
    .get(notesController.index)
    .post(notesController.new);

router.route('/:_id')
    .get(notesController.view)
    .patch(notesController.update)
    .put(notesController.update)
    .delete(notesController.delete);

/*router.get('/', (req, res, next) => {
    return res.send(Object.values(req.context.postbase.messages));
});

router.get('/:id', (req, res, next) => {
    return res.send(req.context.postbase.messages[req.params.id]);
});

router.post('/', (req, res, next) => {
    res.send(req.body);
})

router.post('/:id', (req, res, next) => {
    const id = uuidv4();
    const message = {
        id,
        text: req.body.text,
        userId: req.me.id
    };

    req.context.postbase.messages[id] = message;

    return res.send(message);
});

router.put('/:id', (req, res) => {
    return res.send( `PUT HTTP method on user/${req.params.id} resource`);
});

router.delete('/:id', (req, res) => {
    const {
        [req.params.id]: message,
        ...otherMessages
    } = req.context.postbase.messages;

    req.context.postbase.messages = otherMessages;

    return res.send(req.context.postbase.messages);
});*/

module.exports = router;
