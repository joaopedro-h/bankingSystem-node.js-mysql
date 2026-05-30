const connection = require("../database/connection");

async function checkBalance(user,rl,bankingMenu,pause) {
    
    console.clear();
    console.log("Saldo da conta. 💰");
    
    const sqlBalance =
    `SELECT 
     balance
     FROM users
    WHERE id = ?`

    const [result] = await connection.execute(sqlBalance,[user.id]);

    console.log("R$",result[0].balance);
    
    pause(rl, bankingMenu);
}

module.exports = checkBalance;