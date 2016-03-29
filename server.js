var express       = require('express'),
    bodyParser    = require('body-parser'),
    morgan        = require('morgan');

    //create instance of express object to run our server
    var app       = express();

    app.listen(3000, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("listening on PORT 3000");
      }

    });

