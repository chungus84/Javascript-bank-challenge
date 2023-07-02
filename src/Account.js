class Account {

    #accountBalance;
    #accountTransactions = [];

    constructor(balanceObject) {
        this.#accountBalance = balanceObject;
    }

    getBalance() {
        return this.#accountBalance.getBalance();
    }

    getTransactions() {
        return this.#accountTransactions;
    }

    addTransaction(transactionToAdd) {
        this.#accountTransactions = [transactionToAdd, ...this.#accountTransactions];
    }

    makeTransaction(transactionObject) {
        const transaction = transactionObject;
        this.#accountBalance.makeTransaction(transaction.getTransactionType(), transaction.getAmount());
        transaction.setTransactionBalance(this.getBalance());
        this.addTransaction(transaction);
    }

}

export default Account;
