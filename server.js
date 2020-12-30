// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

const MongoClient = require('mongodb').MongoClient

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/user');

app.listen(3000, function() {
    console.log('listening')
})

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', indexRouter);
// app.use('/user', usersRouter);

MongoClient.connect('mongodb+srv://ptri219:a78322626@cluster0.tppih.mongodb.net/triplepatrick?retryWrites=true&w=majority', {
    useUnifiedTopology: true
}, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
    const db = client.db('triplepatrick')
    const quotesCollection = db.collection('quotes')

    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
            .then(result => {
                console.log(result)
                res.redirect('/')
            })
            .catch(error => console.error(error))
    })

    app.get('/', (req, res) => {
        const cursor = db.collection('quotes').find()
        console.log(cursor)
            // ...
    })

})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
        // Note: __dirname is the current directory you're in. Try logging it and see what you get!
        // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

console.log('May Node be with you')

module.exports = app;