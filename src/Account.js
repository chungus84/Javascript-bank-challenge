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
        this.#accountTransactions = [...this.#accountTransactions, transactionToAdd];
    }

    deposit(transactionObject) {
        const transaction = transactionObject;
        this.#accountBalance.deposit(transaction.getAmount());
        transaction.setTransactionTypeAndBalance('credit', this.#accountBalance.getBalance());
        this.addTransaction(transaction);
    }

    withdraw(transactionObject) {
        const transaction = transactionObject;
        this.#accountBalance.withdraw(transaction.getAmount());
        transaction.setTransactionTypeAndBalance('debit', this.#accountBalance.getBalance());
        this.addTransaction(transaction);
    }

}

export default Account;
