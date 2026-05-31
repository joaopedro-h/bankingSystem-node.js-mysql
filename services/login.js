const connection = require("../database/connection");
const decryptPassword = require("../utils/decryptPassword");
const time = require("../utils/awaitTime");

async function login(rl,mainMenu,bankingMenu,pause) {
    
    console.clear();
    console.log("LOGIN DE USUÁRIO 💾\n");
    
    rl.question(`📩 - Insira seu email: `, (email) => {  /* "email" recebe o email inserido. */

        rl.question(`🔑 - Insira sua senha: `, async (password) => {  /* "password" recebe a senha inserida. */

            const sqlLogin =  /* Cria a query para buscar o usuário pelo email informado. */
            `SELECT 
             id,
             user_name,
             email,
             password,
             balance
            FROM users
            WHERE email = ?`;

            const [result] = await connection.execute(sqlLogin,[email]); /* Executa e armazena os rows em result, ignorando os fields retornados pelo MySQL. */

            if (result.length === 0) {  /* Verifica se existe algum usuário cadastrado com o email informado. */
                console.log("\nNenhum usuário cadastrado! ❌");
                pause(rl,mainMenu);
                return;                
            }

            const user = result[0];  /* Armazena o primeiro usuário encontrado na variável "user". */
            const decryptedPassword = await decryptPassword(password,user);  /* Compara a senha digitada com a senha criptografada do banco de dados. */

            if (decryptedPassword) {  /* Verifica se a senha informada está correta. */

                console.clear();
                console.log("Logado com sucesso! ✅");
                await time(); /* Aguarda 2 segundos antes de abrir o menu bancário. */
                bankingMenu(user); /* Envia os dados do usuário logado para o menu bancário. */
                
            }else{ /* Caso a senha verificada esteja incorreta, aparece a mensagem abaixo. */
                
                console.log("\nSenha incorreta! 🔑");
            
            }

            pause(rl, mainMenu);

        });
    });
}

module.exports = login;