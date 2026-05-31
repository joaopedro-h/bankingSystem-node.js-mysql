const User = require("../models/User");
const {saveUser} = require("./saveUser");
const encryptPassword = require("../utils/encryptPassword");

async function registerUser(rl,mainMenu,pause) {
    
    console.clear();
    rl.question(`👤 - Insira seu nome: `, async (userName) => {  /* "userName" recebe o nome inserido. */

        rl.question(`📩 - Insira seu email: `, async (email) => {  /* "email" recebe o email inserido. */

            rl.question(`🔑 - Insira sua senha: `, async (password) => {  /* "password" recebe a senha inserida. */

                rl.question(`💵 - Insira o saldo da conta: `, async (balance) => {  /* "balance" recebe o saldo inicial da conta. */

                    const encryptedPassword = await encryptPassword(password); /* Criptografa a senha informada pelo usuário. */

                    const user = new User( /* Cria um novo objeto da classe User. */
                        userName,
                        email,
                        encryptedPassword,
                        balance
                    );

                    await saveUser(user,rl,mainMenu,pause); /* Envia o objeto "user" para ser salvo no banco de dados. */

                });
            });
        });
    });
}

module.exports = registerUser;