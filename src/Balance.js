class Balance {

    #balance;

    constructor(newBalance = 0) {
        this.#balance = newBalance;
    }

    getBalance() {
        return this.#balance;
    }

    deposit(amountToAdd) {
        if (isNaN(amountToAdd) || amountToAdd === null) throw new Error('Please enter a valid number');
        this.#balance += parseInt(amountToAdd);
    }

    withdraw(amountToWithdraw) {
        this.#balance -= amountToWithdraw;
    }


}

export default Balance;
