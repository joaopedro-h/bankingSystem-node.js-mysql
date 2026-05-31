const connection = require("../database/connection");

async function saveUser(user,rl,mainMenu,pause) {
    
    const sqlInto =  /* Cria a query para cadastrar um novo usuário. */
    `INSERT INTO users (user_name, email, password, balance)
    VALUES (?,?,?,?)`;

    const values = [ /* Valores que substituirão os "?" da query, recebendo as informações do "user" criado na função "registerUser". */
        user.name,
        user.email,
        user.password,
        user.balance
    ];

    const [result] = await connection.execute(sqlInto,values);  /* Executa a query e armazena os rows em "result", ignorando os fields. */

    console.log("\nCadastrado criado com sucesso! ✅");
    console.log("🆔 = ", result.insertId); /* Exibe o ID gerado automaticamente pelo banco de dados. */

    pause(rl, mainMenu);
    
}

module.exports = {saveUser};