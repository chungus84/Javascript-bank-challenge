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
}

export default Account;
