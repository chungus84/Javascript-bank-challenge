class Transaction {
    #date;
    #transactionType;
    #amount;
    constructor(date, transactionType, amount) {
        this.#date = date;
        this.#transactionType = transactionType;
        this.#amount = amount;
    }
}

export default Transaction;
