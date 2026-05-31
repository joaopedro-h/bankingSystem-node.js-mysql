const bcrypt = require('bcrypt');

async function decryptPassword(password,user) {
    
    const hashPassword = await bcrypt.compare(password, user.password) /* Compara a senha digitada com a senha criptografada armazenada no banco. */

    return hashPassword; /* Retorna true caso as senhas sejam iguais, caso contrário retorna false. */

}

module.exports = decryptPassword;