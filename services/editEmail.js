const connection = require("../database/connection");

async function editEmail(user,rl,bankingMenu,pause) {
    
    console.clear();
    rl.question(`📩 - Insira o email atual: `, async (currentEmail) => { /* "currentEmail" recebe o email atual digitado pelo usuário. */

        const sqlUserEmail = /* Cria a query para consultar o email atual da conta diretamente no banco. */
        `SELECT
         email
         FROM users
        WHERE id = ?`

        const [resultEmail] = await connection.execute(sqlUserEmail,[user.id]); /* Executa e armazena os rows em resultEmail, ignorando os fields retornados pelo MySQL. */

        if (currentEmail != resultEmail[0].email) { /* Verifica se o email informado é igual ao email cadastrado na conta. */
            console.log("Email incorreto! ❌");
            pause(rl, () => bankingMenu(user));   
            return;               
        }

        rl.question(`📩 - Insira o novo email: `, async (newEmail) => { /* "newEmail" recebe o novo email digitado pelo usuário. */

            const sqlEditEmail = /* Cria a query para atualizar o email da conta. */
            `UPDATE users
             SET email = ?
            WHERE id = ?`;

            const valuesEdit = [ /* Valores que substituirão os "?" da query. */
                newEmail,
                user.id
            ];

            await connection.execute(sqlEditEmail,valuesEdit); /* Executa a atualização do email no banco de dados. */

            console.log("\nEmail alterado com sucesso! ✅");
            
            pause(rl, () => bankingMenu(user));

        });

    });
}

module.exports = editEmail;