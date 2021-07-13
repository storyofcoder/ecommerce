const bcrypt = require('bcryptjs');

exports.hashPassword = async (password) => {
    const saltRounds = 10;
  
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) reject(err)
        resolve(hash)
      });
    })
  
    return hashedPassword
  }

exports.matchPassword = async (enteredPassword, realPassword) => {
    return bcrypt.compare(enteredPassword, realPassword);
}
