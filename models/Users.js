var db = require('../conf/database');
var bcrypt = require('bcrypt');
const User = {}

User.create = async (first_name, last_name, address, email, username, password, confirm_password) => {
    // npmjs.com/package/bcrypt
    // using technique 2 to auto-gen a salt and hash
    return bcrypt.hash(password, 10)
    .then((hashed_password) => {
        let baseSQL = "INSERT INTO users (`first_name`, `last_name`, `address`, `email`, `username`, `password`, `created`) VALUES (?, ?, ?, ?, ?, ?, now())";
        return db.execute(baseSQL, [first_name, last_name, address, email, username, password,]);
    })
    .then(([results, fields]) => {
        if(results && results.affectedRows){
            return Promise.resolve(results.insertId);
        } else {
            return Promise.resolve(-1);
        }
    })
};

User.usernameExists = async (username) => {
    return db.execute("SELECT * FROM users where username=?", [username])
    .then(([results, field]) => {
        return Promise.resolve(!(results && results.length == 0));
    })
    .catch((err) => Promise.reject(err));
};

User.emailExists = async (email) => {
    return db.execute("SELECT * FROM users WHERE email=?", [email])
    .then(([results, field]) => {
        return Promise.resolve(!(results && results.length == 0));
    })
    .catch((err) => Promise.reject(err));
};


module.exports = User;