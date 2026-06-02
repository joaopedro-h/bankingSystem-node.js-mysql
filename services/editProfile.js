const editName = require("./editName");
const editEmail = require("./editEmail");
const editPassword = require("./editPassword");

async function editProfile(user,rl,bankingMenu,pause) {
    
    console.clear();
    console.log("Editar perfil. ✏️\n");

    console.log("1. Editar nome 👤");
    console.log("2. Email 📩");
    console.log("3. Senha 🔑");
    console.log("0. Sair ❌");
    
    rl.question(`\n📌 - Selecione oque deseja editar: `, (option) => {

        option = Number(option);

        switch (option) {
            case 1:
                editName(user,rl,bankingMenu,pause);
                break;
            
            case 2:
                editEmail(user,rl,bankingMenu,pause);
                break;
            
            case 3:
                editPassword(user,rl,bankingMenu,pause);
                break;

            
            case 0:
            console.log("Saindo..🚫");
            pause(rl, () => bankingMenu(user));
            return;
                break;

            default:
            console.log("Opção inválida! 🚫");
            pause(rl, () => editProfile(user));   
            return;            
                break;
        }

    });
}

module.exports = editProfile;