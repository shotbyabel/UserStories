//dependecies
var express       = require('express'),
    bodyParser    = require('body-parser'),
    morgan        = require('morgan');

//*modules
    config        = require('./config');
//*<--

//instance of objects
    var app       = express();

//M I D D L E W A R E 
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());
    app.use(morgan('dev'));//logger

//    
    app.get('*', function(req, res) {
      res.sendFile(__dirname + '/public/views/index.html');
    });
  
    app.listen(3000, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("listening on PORT 3000");
      }

    });

