class Balance {

    #balance;

    constructor(newBalance = 0) {
        this.#balance = newBalance;
    }

    getBalance() {
        return this.#balance;
    }

    deposit(amountToAdd) {
        if (isNaN(amountToAdd)) throw new Error('Please enter a valid number');
        this.#balance += parseInt(amountToAdd);
    }


}

export default Balance;
