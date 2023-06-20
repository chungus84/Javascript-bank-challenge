class Balance {

    #balance;

    constructor(newBalance = 0) {
        this.#balance = newBalance;
    }

    getBalance() {
        return this.#balance;
    }

    deposit(amountToAdd) {
        if (!isNaN(amountToAdd)) this.#balance += parseInt(amountToAdd);
    }


}

export default Balance;
