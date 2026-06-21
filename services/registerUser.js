const User = require("../models/User");
const {saveUser} = require("./saveUser");
const encryptPassword = require("../utils/encryptPassword");
const connection = require("../database/connection");

async function registerUser(rl,mainMenu,pause) {
    
    console.clear();
    console.log("REGISTRO DE USUÁRIO 📝\n");
    
    rl.question(`👤 - Insira seu nome: `, async (userName) => {  /* "userName" recebe o nome inserido. */

        rl.question(`📩 - Insira seu email: `, async (email) => {  /* "email" recebe o email inserido. */

            const sqlCheckEmail = /* Cria a query para validar se o email já está em uso. */
            `SELECT 
             email
            FROM users
            WHERE email = ?`;

            const [result] = await connection.execute(sqlCheckEmail,[email]); /* Executa e armazena os rows em result, ignorando os fields retornados pelo MySQL. */

            if (result.length > 0) { /* Se o email já estiver em uso o usuário é retornado ao menu. */
                console.log("\nEmail já em uso por outro usuário! 🚫");
                pause(rl, mainMenu);
                return;
            }

            rl.question(`🔑 - Insira sua senha: `, async (password) => {  /* "password" recebe a senha inserida. */

                rl.question(`🔑 - Confirme a senha: `, async (passwordConfirmed) => {

                    if (password != passwordConfirmed) {  /* Se a senha confirmada não for igual a primeira senha digitada, o usuário é retornado ao menu. */
                        console.log("\nSenha errada! 🚫");
                        pause(rl, mainMenu);
                        return;  
                    }

                    rl.question(`💵 - Insira o saldo da conta: `, async (balance) => {  /* "balance" recebe o saldo inicial da conta. */

                        if (isNaN(balance) || balance <= 0) {  /* Se o saldo não for número ou for menor/igual que 0 o usuário é retornado ao menu. */
                            console.log("\nInsira um valor válido! 🚫");
                            pause(rl, mainMenu);
                            return;                        
                        }

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
    });
}

module.exports = registerUser;