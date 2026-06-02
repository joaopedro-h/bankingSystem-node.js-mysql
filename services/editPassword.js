const connection = require("../database/connection");
const decryptPassword = require("../utils/decryptPassword");
const encryptPassword = require("../utils/encryptPassword");

async function editPassword(user,rl,bankingMenu,pause) {
    
    console.clear();
    rl.question(`🔑 - Insira a senha atual: `, async (currentPassword) => {

        const sqlCheckPassword =
        `SELECT 
         password,
        FROM users
        WHERE id = ?`;

        const [result] = await connection.execute(sqlCheckPassword,[user.id]);
        const userDetails = result[0];

        const decryptedPassword = await decryptPassword(currentPassword,userDetails);

        if (!decryptedPassword) {
            console.log("Senha incorreta! ❌");
            pause(rl, () => bankingMenu(user)); 
            return;               
        }       

        rl.question(`🔑 - Insira a nova senha: `, async (newPassword) => {

            const encryptedPassword = await encryptPassword(newPassword); 

            const sqlEditPassword =
            `UPDATE users
             SET password = ?
            WHERE id = ?`;

            const valuesEdit = [
                encryptedPassword,
                user.id
            ];

            await connection.execute(sqlEditPassword,valuesEdit);

            console.log("\nSenha alterada com sucesso! ✅");

            pause(rl, () => bankingMenu(user));

        });

    });
}

module.exports = editPassword;