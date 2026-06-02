const connection = require("../database/connection");
const time = require("../utils/awaitTime");

async function transferBalance(user,rl,bankingMenu,pause) {
    
    console.clear();
    rl.question(`\n🆔 - Informe o ID da conta destino: `, async (idAccountDeposit) => {

        idAccountDeposit = Number(idAccountDeposit);

        const sqlCheckUser =
        `SELECT
         id
         FROM users
        WHERE id = ?`;

        const [result] = await connection.execute(sqlCheckUser,[idAccountDeposit]);

        if (result.length === 0) {  /* Verifica se existe algum usuário cadastrado com o email informado. */
            console.log("\nNenhum usuário encontrado! ❌");
            pause(rl, () => bankingMenu(user));
            return;      

        }else if (idAccountDeposit === user.id) {
            console.log("\nNão é possível transferir para sua própria conta! ❌");
            pause(rl, () => bankingMenu(user));
            return;                
        }

        rl.question(`💵 - Informe o valor: `, async (transferValue) => {

            transferValue = Number(transferValue);

            if (isNaN(transferValue) || transferValue <= 0) {
                console.log("Valor inválido! 🚫");
                pause(rl, () => bankingMenu(user));
                return;
            }

            const sqlCheckBalance =
            `SELECT
             balance
             FROM users
            WHERE id = ?`;

           const [resultBalance] = await connection.execute(sqlCheckBalance,[user.id]);

           if (transferValue > resultBalance[0].balance) {
                console.log("Saldo insuficiente para transferência! 🚫");
                pause(rl, () => bankingMenu(user));
                return;                
           }

           const sqlTransferValue =
           `UPDATE users
             SET balance = balance + ?
            WHERE id = ?`;

           const valuesTransfer = [
              transferValue,
              idAccountDeposit
           ];

           await connection.execute(sqlTransferValue,valuesTransfer);

           const sqlDiscount =
           `UPDATE users
             SET balance = balance - ?
            WHERE id = ?`;

           const valuesDiscount = [
                transferValue,
                user.id
           ];

           await connection.execute(sqlDiscount,valuesDiscount);

           const sqlTransaction = 
           `INSERT INTO transactions (type,value,user_origin_id,user_destination_id)
            VALUES ("Transferência",?,?,?)`;        

           const valuesTransaction = [
                transferValue,
                user.id,
                idAccountDeposit
           ];

           await connection.execute(sqlTransaction,valuesTransaction);

           const [updatedBalance] = await connection.execute(sqlCheckBalance,[user.id]);

           console.clear();
           console.log("Processando.. ⏳");
           await time();
           console.clear();
           console.log("Transferência realizada com sucesso! ✅");
           console.log(`Saldo após transferência: R$${updatedBalance[0].balance} 💰`);
           
           pause(rl, () => bankingMenu(user));

        });
    });
}

module.exports = transferBalance;