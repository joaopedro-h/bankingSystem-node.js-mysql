const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const registerUser = require("./services/registerUser");
const login = require("./services/login");
const checkBalance = require("./services/checkBalance");
const deposit = require("./services/deposit");
const withdraw = require("./services/withdraw");
const transferBalance = require("./services/transferBalance");
const accountHistory = require("./services/accountHistory");
const editProfile = require("./services/editProfile")
const closeAccount = require("./services/closeAccount");
const pause = require("./services/pause");

async function mainMenu() {

    console.clear();
    console.log("1. Criar usuário. ➕");
    console.log("2. Fazer login. 👤");
    console.log("0. Sair ❌\n");
    
    rl.question(`📌 - Selecione a opção que deseja: `, (option) => {

        option = Number(option);

        switch (option) {
            case 1:
                registerUser(rl,mainMenu,pause);
                break;
            
            case 2:
                login(rl,mainMenu,bankingMenu,pause);
                break;

            case 0:
                console.log("Saindo.. ❌");
                rl.close();
                break;

            default:
                console.log("Opção inválida! 🚫");
                mainMenu();
                break;
        }

    });
}

async function bankingMenu(user) {

    console.clear();
    console.log("1. Consultar saldo 💰");
    console.log("2. Depositar 📥");
    console.log("3. Sacar 📥");
    console.log("4. Transferir 🔄");
    console.log("5. Histórico 📋");
    console.log("6. Editar perfil ✏️");
    console.log("7. Fechar conta 🚫");
    console.log("0. Sair ❌\n");
    
    rl.question(`📌 - Selecione a opção que deseja: `, (option) => {

        option = Number(option);

        switch (option) {
            case 1:
                checkBalance(user,rl,bankingMenu,pause);                
                break;
            
            case 2:
                deposit(user,rl,bankingMenu,pause);
                break;

            case 3:
                withdraw(user,rl,bankingMenu,pause);
                break;

            case 4:
                transferBalance(user,rl,bankingMenu,pause);
                break;

            case 5:
                accountHistory(user,rl,bankingMenu,pause);
                break;

            case 6:
                editProfile(user,rl,bankingMenu,pause);
                break;

            case 7:
                closeAccount(user,rl,bankingMenu,pause);
                break;

            case 0:
                console.log("Saindo.. ❌");
                mainMenu();
                break;
        
            default:
                console.log("Opção inválida! 🚫");
                bankingMenu();
                break;
        }

    });    
}

mainMenu();