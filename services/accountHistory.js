const connection = require("../database/connection");

async function accountHistory(user,rl,bankingMenu,pause) {
    
        console.clear();

        const sqlHistory =  /* Cria a query para realizar a busca do histórico. */
        `SELECT 
		 trans.id_transaction AS "ID da transação",
         trans.type AS "Tipo",
         trans.value AS "Valor",
         userO.user_name AS "Origem",
         userD.user_name AS "Destino",
         date AS "Data"

         FROM transactions trans
         
         INNER JOIN users userO
         ON user_origin_id = userO.id
         
		 LEFT JOIN users userD
         ON user_destination_id = userD.id
		
        WHERE user_origin_id = ?;`;

        const [result] = await connection.execute(sqlHistory,[user.id]);  /* Executa e armazena os rows em result, ignorando os fields retornados pelo MySQL. */

        console.log("\nHistórico de transações. 📜"); /* Exibe o histórico de transações do usuário em forma de tabela. */
        console.table(result);

        pause(rl, () => bankingMenu(user));

}

module.exports = accountHistory;