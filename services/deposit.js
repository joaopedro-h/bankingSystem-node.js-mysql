const connection = require("../database/connection");

async function deposit(user,email,rl,bankingMenu,pause) {
    
    console.clear();
    rl.question(`Insira o valor do deposíto: `, async (depositAmount) => {

        const sqlDeposit =
        `UPDATE users
         SET balance = balance + ?
        WHERE email = ?`;

        const sqlUpdated = 
        `SELECT
         balance
        FROM users
        WHERE email = ?`;

        const values = [
            depositAmount,
            email
        ]

        await connection.execute(sqlDeposit,values);
        const [result] = await connection.execute(sqlUpdated, [email]);
        
        console.log(`Saldo após depósito: R$${result[0].balance} 💰`);
        
        pause(rl, bankingMenu);

    });
}

module.exports = deposit;