const connection = require("../database/connection");
const decryptPassword = require("../utils/decryptPassword");

async function login(rl,mainMenu,pause) {
    
    rl.question(`📩 - Insira seu email: `, (email) => {

        rl.question(`🔑 - Insira sua senha: `, async (password) => {

            const sqlLogin =
            `SELECT 
             user_name,
             email,
             password,
             balance
            FROM users
            WHERE email = ?`;

            const [result] = await connection.execute(sqlLogin,[email]);

            if (result.length === 0) {
                console.log("\nNenhum usuário cadastrado! ❌");
                pause(rl,mainMenu);
                return;                
            }

            const user = result[0];
            const decryptedPassword = await decryptPassword(password,user);

            if (decryptedPassword) {
                console.log("\nLogado com sucesso! ✅");
                
            }else{
                console.log("\nSenha incorreta! 🔑");
            
            }

            pause(rl, mainMenu);

        });
    });
}

module.exports = login;