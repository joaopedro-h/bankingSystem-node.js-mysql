const connection = require("../database/connection");
const editProfile = require("./editProfile");

async function editEmail(user,rl,bankingMenu,pause) {
    
    console.clear();
    rl.question(`📩 - Insira o email atual: `, async (currentEmail) => {

        const sqlUserEmail = 
        `SELECT
         email
         FROM users
        WHERE id = ?`

        const [resultEmail] = await connection.execute(sqlUserEmail,[user.id]);

        if (currentEmail != resultEmail[0].email) {
            console.log("Email incorreto! ❌");
            pause(rl, () => editProfile(user));   
            return;               
        }

        rl.question(`📩 - Insira o novo email: `, async (newEmail) => {

            const sqlEditEmail =
            `UPDATE users
             SET email = ?
            WHERE id = ?`;

            const valuesEdit = [
                newEmail,
                user.id
            ];

            await connection.execute(sqlEditEmail,valuesEdit);

            console.log("\nEmail alterado com sucesso! ✅");
            
            pause(rl, () => bankingMenu(user));

        });

    });
}

module.exports = editEmail;