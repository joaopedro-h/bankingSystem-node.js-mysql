const connection = require("../database/connection");
const decryptPassword = require("../utils/decryptPassword");
const time = require("../utils/awaitTime");

async function closeAccount(user,rl,bankingMenu,pause) {
    
    console.clear();
    rl.question(`🔑 - Insira a senha da conta para encerramento: `, async (passwordEntered) => {

        const sqlCheckPassword = 
        `SELECT 
         password,
         balance
        FROM users
        WHERE id = ?`;

        const [result] = await connection.execute(sqlCheckPassword,[user.id]); 

        const balance = user.balance;

        const userDetails = result[0];

        const decryptedPassword = await decryptPassword(passwordEntered,userDetails); 

        if (!decryptedPassword) { 
            console.log("Senha incorreta! ❌");
            pause(rl, () => bankingMenu(user));
            return;               
        }

        const sqlDeleteAccount =
        `DELETE FROM users
        WHERE id = ?`;

        await connection.execute(sqlDeleteAccount, [user.id]);
        
        console.clear();
        console.log("Processando.. ⏳");
        await time();
        console.clear();
        console.log("Conta fechada com sucesso. ✅");
        console.log(`💰 - Valor disponível para sacar: ${balance}.`)
        
        pause(rl, () => bankingMenu(user));

    });
    
}

module.exports = closeAccount;