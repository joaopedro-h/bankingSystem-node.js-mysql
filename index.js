const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const registerUser = require("./services/registerUser");
const login = require("./services/login");
const pause = require("./services/pause");

async function mainMenu() {

    console.clear();
    console.log("1. Criar usuário. ➕");
    console.log("2. Fazer login. 👤");
    console.log("0. Sair ❌\n");
    
    rl.question(`Selecione a opção que deseja: `, (option) => {

        option = Number(option);

        switch (option) {
            case 1:
                registerUser(rl,mainMenu,pause);
                break;
            
            case 2:
                login(rl,mainMenu,pause);
                break;

            case 0:
                console.log("Saindo..");
                rl.close();
                break;

            default:
                console.log("Opção inválida!");
                mainMenu();
                break;
        }

    });
}



async function bankingMenu() {




}


mainMenu();