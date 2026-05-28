function pause(rl, next) {
    rl.question("\n⏎ Pressione ENTER para continuar...", () => next());
}

module.exports = pause;