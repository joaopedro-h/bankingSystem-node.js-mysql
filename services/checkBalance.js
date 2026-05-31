const connection = require("../database/connection");

async function checkBalance(user,rl,bankingMenu,pause) {
    
    console.clear();
    console.log("Saldo da conta. 💰");
    
    const sqlBalance =  /* Cria a query para exibir o saldo do usuário. */
    `SELECT 
     balance
     FROM users
    WHERE id = ?`

    const [result] = await connection.execute(sqlBalance,[user.id]); /* Executa e armazena os rows em result, ignorando os fields retornados pelo MySQL. */

    console.log("R$",result[0].balance); /* "result[0]" pega o primeiro registro encontrado. */
    
    pause(rl, () => bankingMenu(user));
}

module.exports = checkBalance;