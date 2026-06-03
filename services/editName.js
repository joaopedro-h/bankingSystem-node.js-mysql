const connection = require("../database/connection");

async function editName(user,rl,bankingMenu,pause) {
    
    console.clear();
    rl.question(`👤 - Insira o novo nome: `, async (newName) => { /* "newName" recebe o novo nome digitado pelo usuário. */

        const sqlEditNaME = /* Cria a query para atualizar o nome da conta. */
        `UPDATE users
         SET user_name = ?
        WHERE id = ?`;

        const valuesEdit = [ /* Valores que substituirão os "?" da query. */
            newName,
            user.id
        ];

        await connection.execute(sqlEditNaME,valuesEdit); /* Executa a atualização do nome no banco de dados. */

        console.log("\nNome alterado com sucesso! ✅");
            
        pause(rl, () => bankingMenu(user));

    });    
}

module.exports = editName;