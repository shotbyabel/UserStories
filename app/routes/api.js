var User        = require('../models/user-models'),
    config      = require('../../config'),//to use our secretKey
    secretKey   = config.secretKey;

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

      return api

    }
    