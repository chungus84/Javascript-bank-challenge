class Transaction {

    #date;
    #amount;
    #transactionType;
    #balance = 0;


    constructor(date, amount, transactionType = '') {
        this.#date = new Date(date);
        this.#transactionType = transactionType;
        this.#amount = amount;
    }


    getAmount() {
        return this.#amount;
    }

    getTransactionType() {
        return this.#transactionType;
    }


    getFullTransaction() {
        return {
            date: this.#date.toLocaleDateString('en-GB'),
            amount: this.#amount.toFixed(2),
            transactionType: this.#transactionType,
            balance: this.#balance.toFixed(2),
        }
    }

    setTransactionTypeAndBalance(transactionToAdd, balance) {
        this.#transactionType = transactionToAdd;
        this.#balance = balance
    }
}

export default Transaction;
