const connection = require("../database/connection");

async function accountHistory(user,rl,bankingMenu,pause) {
    
        console.clear();

        const sqlHistory =  /* Cria a query para realizar a busca do histórico. */
        `SELECT 
            t.type AS "Tipo",
            t.value AS "Valor",
            u1.user_name AS "Origem",
            u2.user_name AS "Destino",
            date AS "Data"
        FROM transactions t
        INNER JOIN users u1
            ON t.user_origin_id = u1.id
        INNER JOIN users u2
            ON t.user_destination_id = u2.id
        WHERE user_origin_id = ?;`;

        const [result] = await connection.execute(sqlHistory,[user.id]);  /* Executa e armazena os rows em result, ignorando os fields retornados pelo MySQL. */

        console.log("\nHistórico de transações. 📜"); /* Exibe o histórico de transações do usuário em forma de tabela. */
        console.table(result);

        pause(rl, () => bankingMenu(user));

}

module.exports = accountHistory;