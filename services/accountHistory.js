const connection = require("../database/connection");

async function accountHistory(user,rl,bankingMenu,pause) {
    
    console.clear();
    rl.question(`🆔 - Insira o ID da conta que deseja consultar: `, async (idAccount) => {  /* "idAccount" recebe o ID do usuário. */

        const sqlHistory =  /* Cria a query para realizar a busca do histórico. */
        `SELECT 
         id_transaction AS "ID da transação",
         type AS "Tipo",
         value AS "Valor",
         user_origin_id AS "ID do usuário",
         user_destination_id AS "ID do destinatário",
         date AS "Data"
         FROM transactions
        WHERE user_origin_id = ?`;

        const [result] = await connection.execute(sqlHistory,[idAccount]);  /* Executa e armazena os rows em result, ignorando os fields retornados pelo MySQL. */

        console.log("\nHistórico de transações. 📜"); /* Exibe o histórico de transações do usuário em forma de tabela. */
        console.table(result);

        pause(rl, () => bankingMenu(user));

    });
}

module.exports = accountHistory;