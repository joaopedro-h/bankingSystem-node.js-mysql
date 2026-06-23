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

        const sqlDeletAccount = /* Cria a query para fechar a conta do usuário. */
        `DELETE FROM transactions
         WHERE user_origin_id = ? OR user_destination_id = ?;

         DELETE FROM users
        WHERE id = ?;`;

        await connection.query(sqlDeletAccount, [user.id, user.id, user.id]); /* Executa o fechamento a conta. */
        
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