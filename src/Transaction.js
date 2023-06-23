class Transaction {
    #date;
    #amount;
    #transactionType;
    #balance = 0;
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
            balance: this.#balance,
        }
    }

    setTransactionTypeAndBalance(transactionToAdd, balance) {
        this.#transactionType = transactionToAdd;
        this.#balance = balance
    }
}

export default Transaction;
