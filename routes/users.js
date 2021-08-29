var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', (req, res, next) => {
    const { first_name, last_name, address, email, username, password, confirm_password } = req.body;
    
    res.redirect('/registration');
});

router.post('/login', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;