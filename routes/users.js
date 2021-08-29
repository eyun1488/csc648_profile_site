var express = require('express');
var router = express.Router();
var db = require('../conf/database');
const User = require('../models/Users');
const UserError = require('../helpers/error/UserError');
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
var bcrypt = require('bcrypt');
var flash = require('express-flash');
var { body, validationResult } = require('express-validator');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/register', [body("email").isEmail()], (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    res.redirect("/");
  } else {
    const { first_name, last_name, address, email, username, password, confirm_password } = req.body;
    // then promises
    User.usernameExists(username)
    .then((usernameDoesExist) => {
      if(usernameDoesExist) {
        throw new UserError(
          "Registration Failed: Username already exist",
          "/registration",
          200
        );
      } else {
        return User.emailExists(email);
      }
    })
    .then((emailDoesExist) => {
      if(emailDoesExist) {
        throw new UserError(
          "Registration Failed: Email already exist",
          "/registration",
          200
        )
      } else {
          return User.create(first_name, last_name, address, email, username, password);
      }
    })
    .then((createdUserId) => {
      if(createdUserId < 0) {
        throw new UserError(
          "Server Error, user could not be created",
          "/registration",
          500
        );
      } else {
        successPrint("Registration Success: User was created!");
        req.flash('success', 'User account has been made!');
        res.redirect("/login");
      }
    })
    .catch((err) => {
      errorPrint("User couldn't be made", err);
      if (err instanceof UserError) {
        // print to console
        errorPrint(err.getMessage());
        // flash on browser
        req.flash('error', err.getMessage());
        res.status(err.getStatus());
        res.redirect(err.getRedirectURL());
      } else {
        next(err);
      }
    });
  }
});

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  

  res.redirect('/login');
});


// purely here to test if the db is connect
// use url
// localhost:3000/users/getUsers
// look in console to see if the data is being re
// router.get('/getUsers', (req, res, next) => {
//   let baseSQL = "SELECT * FROM users";
//   db.execute(baseSQL).then(([results, fields]) => {
//     if(results && results.length == 0)
//     console.log('error');
//     else
//     console.log(results);
//   })
// })

module.exports = router;