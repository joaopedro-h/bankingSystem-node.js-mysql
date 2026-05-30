async function time() {
    
    await new Promise(resolve => setTimeout(resolve, 2000));

}

module.exports = time;