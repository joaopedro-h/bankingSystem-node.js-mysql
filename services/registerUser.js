const User = require("../models/User");
const {saveUser} = require("./saveUser");
const encryptPassword = require("../utils/encryptPassword");

async function registerUser(rl,mainMenu,pause) {
    
    console.clear();
    rl.question(`👤 - Insira o nome: `, async (userName) => {

        rl.question(`📩 - Insira o email: `, async (email) => {

            rl.question(`🔑 - Insira a senha: `, async (password) => {

                rl.question(`💵 - Insira o saldo: `, async (balance) => {

                    const encryptedPassword = await encryptPassword(password);

                    const user = new User(
                        userName,
                        email,
                        encryptedPassword,
                        balance
                    );

                    await saveUser(user,rl,mainMenu,pause);

                });
            });
        });
    });
}

module.exports = registerUser;