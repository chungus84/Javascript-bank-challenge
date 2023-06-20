class Account {

    #accountBalance;

    constructor(balanceObject) {
        this.#accountBalance = balanceObject;
    }

    getBalance() {
        return this.#accountBalance.getBalance();
    }

    deposit(amountToAdd) {
        this.#accountBalance.deposit(amountToAdd);
    }

    withdraw(amountToWithdraw) {
        this.#accountBalance.withdraw(amountToWithdraw);
    }
}

export default Account;
