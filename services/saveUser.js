const connection = require("../database/connection");

async function saveUser(user,rl,mainMenu,pause) {
    
    const sqlInto =
    `INSERT INTO users (user_name, email, password, balance)
    VALUES (?,?,?,?)`;

    const values = [
        user.name,
        user.email,
        user.password,
        user.balance
    ];

    const [result] = await connection.execute(sqlInto,values);

    console.log("\nCadastrado criado com sucesso! ✅");
    console.log("🆔 = ", result.insertId);

    pause(rl, mainMenu);
    
}

module.exports = {saveUser};