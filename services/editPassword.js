const connection = require("../database/connection");
const decryptPassword = require("../utils/decryptPassword");
const encryptPassword = require("../utils/encryptPassword");

async function editPassword(user,rl,bankingMenu,pause) {
    
    console.clear();

    rl.question(`🔑 - Insira a senha atual: `, async (currentPassword) => { /* "currentPassword" recebe a senha atual digitada pelo usuário. */

        const sqlCheckPassword = /* Cria a query para consultar a senha atual do usuário diretamente no banco. */
        `SELECT 
         password
        FROM users
        WHERE id = ?`;

        const [result] = await connection.execute(sqlCheckPassword,[user.id]); /* Executa e armazena os rows em result, ignorando os fields retornados pelo MySQL. */

        const userDetails = result[0]; /* "result[0]" pega o primeiro registro encontrado. */

        const decryptedPassword = await decryptPassword(currentPassword,userDetails); /* Compara a senha digitada com a senha criptografada armazenada no banco. */

        if (!decryptedPassword) { /* Verifica se a senha informada está incorreta. */

            console.log("Senha incorreta! ❌");
            pause(rl, () => bankingMenu(user));
            return;               
        }

        rl.question(`🔑 - Insira a nova senha: `, async (newPassword) => { /* "newPassword" recebe a nova senha digitada pelo usuário. */

            const encryptedPassword = await encryptPassword(newPassword); /* Criptografa a nova senha antes de armazenar no banco. */

            const sqlEditPassword = /* Cria a query para atualizar a senha do usuário. */
            `UPDATE users
             SET password = ?
            WHERE id = ?`;

            const valuesEdit = [ /* Valores que substituirão os "?" da query. */
                encryptedPassword,
                user.id
            ];

            await connection.execute(sqlEditPassword,valuesEdit); /* Executa a atualização da senha no banco de dados. */

            console.log("\nSenha alterada com sucesso! ✅");

            pause(rl, () => bankingMenu(user));

        });

    });
}

module.exports = editPassword;