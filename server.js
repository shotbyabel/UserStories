//dependecies
var express       = require('express'),
    bodyParser    = require('body-parser'),
    morgan        = require('morgan');
    mongoose      = require('mongoose');

//*modules
    config        = require('./config');
//*<--

//instance of objects
    var app       = express();

//D A T A B A S E connect
mongoose.connect(config.database, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to MLab MongoDB")
  }

});

//M I D D L E W A R E 
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());
    app.use(morgan('dev'));//logger
    //access our css & javascript files
    app.use(express.static(__dirname + '/public'));
//

//R O U T E S
    var api = require('./app/routes/api')(app, express);
    app.use('/api', api);


    app.get('*', function(req, res) {
      res.sendFile(__dirname + '/public/app/views/index.html');
    });
  
    app.listen(3000, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("listening on PORT 3000");
      }

    });

