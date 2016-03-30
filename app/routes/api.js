var User        = require('../models/user-models'),
    config      = require('../../config'),//to use our secretKey
    secretKey   = config.secretKey;
//*1 -
var jwt         = require('jsonwebtoken');    

//*2 -
function createToken(user) {

  var token = jwt.sign({
    _id: user._id,
    name: user.name,
    username: user.username
  }, secretKey, {
    expiresinMinute: 1440
  });

  return token;//*3 -

}


module.exports = function(app, express) {

      var api = express.Router();
//create user route

  api.post('/signup', function(req, res) {

    var user = new User({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password
    });

    user.save(function(err) {
      if (err) {
        res.send(err);
        return;
      }

      res.json({
        message: "A new user has been created!"
      });

    });

  });

//get all users route
  api.get('/users', function(req, res) {
    User.find({}, function(err, users) {
      if (err) {
        res.send(err);
        return;
      }

      res.json(users);
    }); //mongoose find method
  });

///////////////////////////////////////
//L O G I N  R O U T E w/JWT DESTINATION A
  api.post('/login', function(req, res) {

    User.findOne({
      username: req.body.username
    }).select('password').exec(function(err, user) {

      if(err) throw err;

      if (!user) {

        res.send({
          message: "This user does not exist."
        });
      } else if(user){

        var validPassword = user.comparePassword(req.body.password);

        if (!validPassword) {
          res.send({
            message: "Invalid Password!"
          })
        } else {
          
          //4* - pass created token to the user that logs in
          var token = createToken(user);

          res.json({
            success: true,
            message: "Successful Login!",
            token: token

          });

        }

      }

    });

  });
///
//MIDDLEWARE //After user succesfully logs in...check for authentication: MIDDLEWARE
  api.use(function(req, res, next) {
    console.log("User entered the app!");
    //CHECK for the token.. token is stored here.. body or headers.. 
    var token = req.body.token || req.param('token') || req.headers['x-access-token'];
    //VERIFY if token exist
    if (token) {
      //use our jwt object 
      jwt.verify(token, secretKey, function(err, decoded) {

        if (err) {
          res.status(403).send({
            success: false,
            message: "Failed to authenticate user"
          });

        } else {
          //
          req.decoded = decoded;

          next();
        }
      });
      //VERIFY if token DOES NOT exist    
    } else {

      res.status(403).send({
        success: false,
        message: "There's no token!"
      });

    }
  });

  //Legitimate Token DESTINATION B
  //Home Route
  api.get('/', function(req, res) {
    res.json("Home Route! Home fly!");
  });

      return api

    }
    