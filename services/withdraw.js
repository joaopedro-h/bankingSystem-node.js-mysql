const connection = require("../database/connection");

async function withdraw(user,rl,bankingMenu,pause) {
    
    console.clear();
    rl.question(`Insira o valor do saque: `, async (withdrawAmount) => { /* "withdrawAmount" recebe o valor do saque. */

        withdrawAmount = Number(withdrawAmount); /* Converte a string em número. */

        if (isNaN(withdrawAmount) || withdrawAmount <= 0) { /* Verifica se o valor informado não é numérico ou é menor/igual a zero. */
            console.log("Valor inválido! 🚫");
            pause(rl, () => bankingMenu(user));
            return;
        }

        const sqlWithdraw = /* Cria a query para realizar o saque. */
        `UPDATE users
         SET balance = balance - ?
        WHERE id = ?`;
        
        const valuesWithdraw = [ /* Valores que substituirão os "?" da query. */
            withdrawAmount,
            user.id
        ];
        
        await connection.execute(sqlWithdraw,valuesWithdraw); /* Executa o saque, trocando as "?" por "withdrawAmount" e "user.id". */

        const sqlTransaction = /* Cria a query para registrar a transação no histórico. */
        `INSERT INTO transactions (type,value,user_origin_id)
        VALUES ("Depósito",?,?)`;

        const valuesTransaction = [ /* Valores que substituirão os "?" da query. */
            withdrawAmount,
            user.id
        ];

        await connection.execute(sqlTransaction,valuesTransaction); /* Executa a transação, trocando as "?" por "depositAmount" e "user.id". */

        const sqlUpdated = /* Cria a query para atualizar o valor da conta. */
        `SELECT
         balance
        FROM users
        WHERE id = ?`;

        const [result] = await connection.execute(sqlUpdated, [user.id]); /* Executa e armazena os rows em result, ignorando os fields retornados pelo MySQL. */
        
        console.log(`Saldo após saque: R$${result[0].balance} 💰`); /* "result[0]" pega o primeiro registro encontrado. */
        
        pause(rl, () => bankingMenu(user));

    });
}

module.exports = withdraw;