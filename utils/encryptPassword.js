const bcrypt = require('bcrypt');

async function encryptPassword(password) {
    
    const saltRounds = 10; /* Define a quantidade de rodadas utilizadas na criptografia. */
    const hashPassword = await bcrypt.hash(password,saltRounds); /* Criptografa a senha utilizando bcrypt. */

    return hashPassword; /* Retorna a senha criptografada. */

}

module.exports = encryptPassword;