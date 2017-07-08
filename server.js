/* jshint esversion:6, node: true */

/*
 * Whapp Whobot Data Viewer API © 2017 - Jay Schwane
*/

/* ================================= SETUP ================================= */

const express       = require('express'),
      app           = express(),
      morgan        = require('morgan'),
      bodyParser    = require('body-parser'),
      
      db            = require('./db'),
      mongoose      = require('mongoose'),
      
      apiRoutes     = require('./routes/api_routes'),
      publicRoutes  = require('./routes/public_routes'),
      
      port          = process.env.PORT || 3000;


/* ============================= CONFIGURATION ============================= */

// set static files location
app.use(express.static(__dirname + '/client'));

// enable logger
app.use(morgan('dev'));

// enable body parsing
app.use(bodyParser.urlencoded({ 'extended' : 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


/* ================================ ROUTES ================================= */

app.use(apiRoutes);
app.use(publicRoutes);


/* ============================= ERROR HANDLER ============================ */

app.use(function (err, req, res, next) {
    console.log('Error!\n', err.stack);
    res.status(500).send('Something broke...');
});

/* ============================= CONNECT TO DB ============================= */
mongoose.connect(db.getDbConnectionString());
mongoose.Promise = global.Promise;


/* ================================ STARTUP ================================ */

app.listen(port, function () {
    console.log(`Server listening on port ${port}.`);
});
