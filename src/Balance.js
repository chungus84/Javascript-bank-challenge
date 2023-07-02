class Balance {

    #balance;

    constructor(newBalance = 0) {
        this.#balance = parseFloat(newBalance);
    }

    getBalance() {
        return this.#balance;
    }

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
