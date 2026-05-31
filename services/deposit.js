const connection = require("../database/connection");

async function deposit(user,rl,bankingMenu,pause) {
    
    console.clear();
    rl.question(`Insira o valor do deposíto: `, async (depositAmount) => { /* "depositAmount" recebe o valor do depósito. */

        depositAmount = Number(depositAmount); /* Converte a string em número. */

        if (isNaN(depositAmount) || depositAmount <= 0) { /* Verifica se o valor informado não é numérico ou é menor/igual a zero. */
            console.log("Valor inválido! 🚫");
            pause(rl, () => bankingMenu(user));
            return;
        }

        const sqlDeposit = /* Cria a query para realizar o depósito. */
        `UPDATE users
         SET balance = balance + ?
        WHERE id = ?`;
        
        const valuesDeposit = [ /* Valores que substituirão os "?" da query. */
            depositAmount,
            user.id
        ];
        
        await connection.execute(sqlDeposit,valuesDeposit); /* Executa o depósito, trocando as "?" por "depositAmount" e "user.id". */

        const sqlTransaction = /* Cria a query para registrar a transação no histórico. */
        `INSERT INTO transactions (type,value,user_origin_id)
        VALUES ("Depósito",?,?)`;

        const valuesTransaction = [ /* Valores que substituirão os "?" da query. */
            depositAmount,
            user.id
        ];

        await connection.execute(sqlTransaction,valuesTransaction); /* Executa a transação, trocando as "?" por "depositAmount" e "user.id". */

        const sqlUpdated = /* Cria a query para atualizar o valor da conta. */
        `SELECT
         balance
        FROM users
        WHERE id = ?`;

        const [result] = await connection.execute(sqlUpdated, [user.id]); /* Executa e armazena os rows em result, ignorando os fields retornados pelo MySQL. */
        
        console.log(`Saldo após depósito: R$${result[0].balance} 💰`); /* "result[0]" pega o primeiro registro encontrado. */
        
        pause(rl, () => bankingMenu(user));

    });
}

module.exports = deposit;