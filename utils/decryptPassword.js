const bcrypt = require('bcrypt');

async function decryptPassword(password,user) {
    
    const hashPassword = await bcrypt.compare(password, user.password)

    return hashPassword;

}

module.exports = decryptPassword;