function pause(rl, next) {
    rl.question("\n⏎ Pressione ENTER para continuar...", () => next());  /* Cria uma pausa no sistema e executa a função recebida no lugar de "next" após o ENTER. */
}

module.exports = pause;