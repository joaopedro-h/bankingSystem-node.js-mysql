const connection = require("../database/connection");
const time = require("../utils/awaitTime");

async function withdraw(user,rl,bankingMenu,pause) {
    
    console.clear();
    console.log("SAQUE ➖\n");

    rl.question(`Insira o valor do saque: `, async (withdrawAmount) => { /* "withdrawAmount" recebe o valor do saque. */

        withdrawAmount = Number(withdrawAmount); /* Converte a string em número. */

        if (isNaN(withdrawAmount) || withdrawAmount <= 0) { /* Verifica se o valor informado não é numérico ou é menor/igual a zero. */
            console.log("Valor inválido! 🚫");
            pause(rl, () => bankingMenu(user));
            return;
        }

        const sqlUserBalance = /* Cria a query para realizar a consulta do saldo diretamente no banco. */
        `SELECT 
         balance
         FROM users
        WHERE id = ?`;

        const [resultBalance] = await connection.execute(sqlUserBalance,[user.id]);  /* Executa e armazena os rows em resultBalance, ignorando os fields retornados pelo MySQL. */

        if (withdrawAmount > resultBalance[0].balance) {  /* Verifica se o valor disponível na conta é suficiente para o saque. */
            console.log("Saldo insuficiente na conta! 🚫");
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
        `INSERT INTO transactions (type,value,user_origin_id,user_destination_id)
        VALUES ("Saque",?,?,?)`;

        const valuesTransaction = [ /* Valores que substituirão os "?" da query. */
            withdrawAmount,
            user.id,
            user.id
        ];

        await connection.execute(sqlTransaction,valuesTransaction); /* Executa a transação, trocando as "?" por "withdrawAmount" e "user.id". */

        /* Executa a query novamente para atualizar o saldo, conferindo diretamente no banco de dados. */
        const [updatedBalance] = await connection.execute(sqlUserBalance, [user.id]); /* Executa e armazena os rows em "updatedBalance", ignorando os fields retornados pelo MySQL. */

        console.clear();
        console.log("Processando.. ⏳");
        await time();  /* Aguarda 2 segundos antes de exibir o resultado. */
        console.clear();        
        console.log("Saque realizado com sucesso! ✅");
        console.log(`Saldo após saque: R$${updatedBalance[0].balance} 💰`); /* "result[0]" pega o primeiro registro encontrado. */
        
        pause(rl, () => bankingMenu(user));

    });
}

module.exports = withdraw;