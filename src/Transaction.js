class Transaction {
    #date;
    #amount;
    #transactionType;
    constructor(date, amount, transactionType = '') {
        this.#date = date;
        this.#transactionType = transactionType;
        this.#amount = amount;
    }

    getAmount() {
        return this.#amount;
    }

    getFullTransaction() {
        return {
            date: this.#date,
            amount: this.#amount,
            transactionType: this.#transactionType,
        }
    }
}

export default Transaction;
