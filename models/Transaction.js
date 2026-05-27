class Transaction {
    constructor(idTransaction, type, value, userOriginId, userDestinationID, date) {
        
        this.idTransaction = idTransaction;
        this.type = type;
        this.value = value;
        this.userOriginId = userOriginId;
        this.userDestinationID = userDestinationID;
        this.date = date;

    }
}

module.exports = Transaction;