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
        const transaction = transactionObject.getFullTransaction();
        this.#accountBalance.deposit(transaction.amount);
    }

    withdraw(amountToWithdraw) {
        this.#accountBalance.withdraw(amountToWithdraw);
    }



}

export default Account;
