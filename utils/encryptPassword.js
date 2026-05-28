const bcrypt = require('bcrypt');

async function encryptPassword(password) {
    
    const salt = 10;
    const hashPassword = await bcrypt.hash(password,salt);

    return hashPassword;

}

module.exports = encryptPassword;