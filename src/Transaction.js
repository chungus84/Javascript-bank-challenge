class Transaction {
    #date;
    #transactionType;
    #amount;
    constructor(date, transactionType, amount) {
        this.#date = date;
        this.#transactionType = transactionType;
        this.#amount = amount;
    }

    getFullTransaction() {
        return {
            date: this.#date,
            transactionType: this.#transactionType,
            amount: this.#amount,
        }
    }
}

export default Transaction;
