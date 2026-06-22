const connection = require("../database/connection");
const time = require("../utils/awaitTime");

async function transferBalance(user,rl,bankingMenu,pause) {
    
    console.clear();
    console.log("TRANSFERÊNCIA BANCÁRIA 🔄\n");
    
    rl.question(`\n🆔 - Informe o ID da conta destino: `, async (idAccountDeposit) => {  /* "idAccountDeposit" recebe o ID da conta que irá receber a transferência. */

        idAccountDeposit = Number(idAccountDeposit);  /* Converte a string em número. */

        const sqlCheckUser =  /* Cria a query para verificar se a conta destino existe. */
        `SELECT
         id
         FROM users
        WHERE id = ?`;

        const [result] = await connection.execute(sqlCheckUser,[idAccountDeposit]); /* Executa e armazena os rows em result, ignorando os fields retornados pelo MySQL. */

        if (result.length === 0) {  /* Verifica se existe algum usuário cadastrado com o ID informado. */
            console.log("\nNenhum usuário encontrado! ❌");
            pause(rl, () => bankingMenu(user));
            return;      

        }else if (idAccountDeposit === user.id) { /* Verifica se o usuário está tentando transferir para sua própria conta. */
            console.log("\nNão é possível transferir para sua própria conta! ❌");
            pause(rl, () => bankingMenu(user));
            return;                
        }

        rl.question(`💵 - Informe o valor: `, async (transferValue) => {  /* "transferValue" recebe o valor da transferência. */

            transferValue = Number(transferValue);

            if (isNaN(transferValue) || transferValue <= 0) {  /* Verifica se o valor informado não é numérico ou é menor/igual a zero. */
                console.log("Valor inválido! 🚫");
                pause(rl, () => bankingMenu(user));
                return;
            }

            const sqlCheckBalance =  /* Cria a query para consultar o saldo da conta diretamente no banco. */
            `SELECT
             balance
             FROM users
            WHERE id = ?`;

           const [resultBalance] = await connection.execute(sqlCheckBalance,[user.id]);  /* Executa e armazena os rows em resultBalance, ignorando os fields retornados pelo MySQL. */

           if (transferValue > resultBalance[0].balance) {  /* Verifica se o saldo disponível é suficiente para realizar a transferência. */
                console.log("Saldo insuficiente para transferência! 🚫");
                pause(rl, () => bankingMenu(user));
                return;                
           }

           const sqlTransferValue =  /* Cria a query para adicionar o valor na conta destino. */
           `UPDATE users
             SET balance = balance + ?
            WHERE id = ?`;

           const valuesTransfer = [  /* Valores que substituirão os "?" da query. */
              transferValue,
              idAccountDeposit
           ];

           const sqlDiscount =  /* Cria a query para descontar o valor da conta de origem. */
           `UPDATE users
             SET balance = balance - ?
            WHERE id = ?`;

           const valuesDiscount = [  /* Valores que substituirão os "?" da query. */
                transferValue,
                user.id
           ];

           const sqlTransaction =  /* Cria a query para registrar a transferência no histórico de transações. */
           `INSERT INTO transactions (type,value,user_origin_id,user_destination_id)
            VALUES ("Transferência",?,?,?)`;        

           const valuesTransaction = [  /* Valores que substituirão os "?" da query. */
                transferValue,
                user.id,
                idAccountDeposit
           ];

           const conn = await connection.getConnection();

           try {  /* Tenta executar todas as operações da transferência. */
            
                await conn.beginTransaction();  /* Inicia uma transação no banco de dados. Nenhuma alteração será salva definitivamente até o commit. */

                await conn.execute(sqlTransferValue,valuesTransfer);  /* Executa a transferência para a conta destino. */
                await conn.execute(sqlDiscount,valuesDiscount);  /* Executa o desconto na conta de origem. */
                await conn.execute(sqlTransaction,valuesTransaction);  /* Executa o registro da transação no banco de dados. */

                await conn.commit();  /* Confirma todas as alterações realizadas durante a transação. */
            
           } catch (error) {  /* Captura qualquer erro ocorrido durante a transação. */

                console.log("Erro na transação! 🚫");
                await conn.rollback();  /* Cancela todas as alterações realizadas desde o beginTransaction. */
                pause(rl, () => bankingMenu(user));
                return;  

           } finally {

                conn.release();
           }

           const [updatedBalance] = await connection.execute(sqlCheckBalance,[user.id]);  /* Executa a consulta novamente para obter o saldo atualizado da conta. */

           console.clear();
           console.log("Processando.. ⏳");
           await time();  /* Aguarda 2 segundos antes de exibir o resultado. */
           console.clear();
           console.log("Transferência realizada com sucesso! ✅");
           console.log(`Saldo após transferência: R$${updatedBalance[0].balance} 💰`); /* "updatedBalance[0]" pega o primeiro registro encontrado. */
           
           pause(rl, () => bankingMenu(user));

        });
    });
}

module.exports = transferBalance;