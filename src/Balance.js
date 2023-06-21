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
        if (amountToWithdraw > this.#balance) throw new Error('You do not have enough in your account');
        if (isNaN(amountToWithdraw) || amountToWithdraw === null) throw new Error('Please enter a valid number');
        this.#balance -= parseInt(amountToWithdraw);
    }

    validateEntry(entryToValidate) {
        if (isNaN(entryToValidate) || entryToValidate === null) throw new Error('Please enter a valid number');
    }


}

export default Balance;
