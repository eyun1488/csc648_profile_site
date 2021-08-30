var db = require('../conf/database');
var bcrypt = require('bcrypt');
const User = {}

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

User.addressExists = async (address) => {
    return db.execute("SELECT * FROM users WHERE address=?", [address])
    .then(([results, field]) => {
        return Promise.resolve(!(results && results.length == 0));
    })
    .catch((err) => Promise.reject(err));
}

User.create = async (first_name, last_name, address, email, username, password) => {
    // npmjs.com/package/bcrypt
    // using technique 2 to auto-gen a salt and hash
    return bcrypt.hash(password, 10)
    .then((hashed_password) => {
        let baseSQL = "INSERT INTO users (`first_name`, `last_name`, `address`, `email`, `username`, `password`, `created`) VALUES (?, ?, ?, ?, ?, ?, now())";
        return db.execute(baseSQL, [first_name, last_name, address, email, username, password]);
    })
    .then(([results, fields]) => {
        if(results && results.affectedRows){
            return Promise.resolve(results.insertId);
        } else {
            return Promise.resolve(-1);
        }
    })
};

// create auth method for login below
User.authenticate = async (username, password) => {
    let baseSQL = "SELECT id, username, password FROM users WHERE username=?";
    let userId; // <-- don't change to id or it'll mess up with mysql
    return db.execute(baseSQL, [username])
    .then(([results, field]) => {
        if(results && results.length == 0){
            userId = results[0].id;
            return bcrypt.compare(password, results[0].password);
        } else {
            return Promise.reject(-1);
        }
    })
    .then((passwordsMatched) => {
        if(passwordsMatched) {
            return Promise.resolve(userId);
        } else {
            return Promise.resolve(-1);
        }
    })
    .catch((err) => Promise.reject(err));
}

module.exports = User;