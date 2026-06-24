const connection = require("../database/connection");
const decryptPassword = require("../utils/decryptPassword");
const time = require("../utils/awaitTime");

async function closeAccount(user,rl,bankingMenu,mainMenu,pause) {
    
    console.clear();
    console.log("FECHAMENTO DE CONTA ❌\n");

    rl.question(`🔑 - Insira a senha da conta para encerramento: `, async (passwordEntered) => { /* "passwordEntered" recebe a senha digitada pelo usuário. */

        const sqlCheckPassword = /* Cria a query para consultar a senha e o saldo da conta diretamente no banco. */
        `SELECT 
         password,
         balance
        FROM users
        WHERE id = ?`;

        const [result] = await connection.execute(sqlCheckPassword,[user.id]); /* Executa e armazena os rows em result, ignorando os fields retornados pelo MySQL. */

        const balance = user.balance; /* Armazena o saldo atual da conta para exibição após o encerramento. */

        const userDetails = result[0]; /* "result[0]" pega o primeiro registro encontrado. */

        const decryptedPassword = await decryptPassword(passwordEntered,userDetails); /* Compara a senha digitada com a senha criptografada armazenada no banco. */

        if (!decryptedPassword) { /* Verifica se a senha informada está incorreta. */
            console.log("Senha incorreta! ❌");
            pause(rl, () => bankingMenu(user));
            return;               
        }

        const sqlDeletTransactions = /* Cria a query para deletar as transações do usuário. */
        `DELETE FROM transactions
        WHERE user_origin_id = ? OR user_destination_id = ?;`

        const sqlDeleteAccount = /* Cria a query para fechar a conta do usuário. */
        `DELETE FROM users
        WHERE id = ?;`
        
        const conn = await connection.getConnection();

        try {  /* Tenta executar todas as operações da transferência. */
            
            await conn.beginTransaction();  /* Inicia uma transação no banco de dados. Nenhuma alteração será salva definitivamente até o commit. */

            await conn.execute(sqlDeletTransactions,[user.id,user.id]);  /* Executa a query, deletando as transações do usuário. */
            await conn.execute(sqlDeleteAccount,[user.id]);  /* Executa a query, fechando a conta do usuário. */

            await conn.commit();  /* Confirma todas as alterações realizadas durante a transação. */

        } catch (error) {  /* Captura qualquer erro ocorrido durante a transação. */
            
            console.log("Erro no encerramento da conta! 🚫");
            await conn.rollback();  /* Cancela todas as alterações realizadas desde o beginTransaction. */
            pause(rl, () => bankingMenu(user));
            return;             

        } finally {

            connection.release();
        }
        
        console.clear();
        console.log("Processando.. ⏳");

        await time(); /* Aguarda 2 segundos antes de exibir o resultado. */

        console.clear();
        console.log("Conta fechada com sucesso. ✅");
        console.log(`💰 - Valor disponível para sacar: ${balance}.`) /* Exibe o saldo que estava disponível na conta antes do encerramento. */
        
        pause(rl, () => mainMenu(user));

    });
    
}

module.exports = closeAccount;