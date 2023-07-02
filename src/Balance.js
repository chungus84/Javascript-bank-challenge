class Balance {

    #balance;

    constructor(newBalance = 0) {
        this.#balance = parseFloat(newBalance);
    }

    getBalance() {
        return this.#balance;
    }

    /*
    Had to use an if-else here as it's a void method so with no return statement would continue just end up adding
    the amount when exiting the even on debits.
     */

    makeTransaction(transactionType, amount) {
        this.validateEntry(amount)
        if (transactionType === `debit`) {
            if (amount > this.#balance) throw new Error(`You do not have enough in your account`)
            this.#balance -= parseFloat(amount);
        } else { this.#balance += parseFloat(amount); }
    }

    validateEntry(entryToValidate) {
        if (isNaN(entryToValidate) || entryToValidate === null || entryToValidate < 0) throw new Error(`Please enter a valid number`);
    }

}

export default Balance;
