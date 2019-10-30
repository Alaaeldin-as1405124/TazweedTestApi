const baseRouter = require('./routers/base-router');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
let app = express();


const mongoose = require('mongoose');
//Open connection
mongoose.Promise = global.Promise; //ES6 Native promise
mongoose.connect("mongodb://127.0.0.1:27017/TazweedTestDB", {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('database opened successfully'))
    .catch(err => console.log(err));

const db = mongoose.connection;

db.on('error', function () {
    console.log("Connection to MongoDB database failed");
    process.exit(1);
});

db.once('open', function () {
    //in case if we want to do something once the db initialized
});

// middleware for logging
app.use(logger('dev'));
let corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

//middleware for parsing json data coming with the request
app.use(bodyParser.json());


app.use(baseRouter);


//if you will change this don't forget to change it in Global class
const port = 8000;
const hostname = '127.0.0.1';
app.listen(port, hostname, () => {
    console.log(`Server started @ http://${hostname}:${port}`);
});

