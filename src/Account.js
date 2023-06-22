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
        transaction.setTransactionType('deposit');
        this.addTransaction(transaction);
    }

    withdraw(amountToWithdraw) {
        this.#accountBalance.withdraw(amountToWithdraw);
    }



}

export default Account;
