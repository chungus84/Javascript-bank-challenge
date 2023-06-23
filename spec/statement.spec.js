import Statement from "../src/Statement.js";

describe('Statement Class tests', () => {

    class MockAccount {
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
            transaction.setTransactionTypeAndBalance('credit', this.getBalance());
            this.addTransaction(transaction);
        }

        withdraw(transactionObject) {
            const transaction = transactionObject;
            this.#accountBalance.withdraw(transaction.getAmount());
            transaction.setTransactionTypeAndBalance('debit', this.getBalance());
            this.addTransaction(transaction);
        }
    }

    class MockBalance {
        #balance;

        constructor(newBalance = 0) {
            this.#balance = newBalance;
        }

        getBalance() {
            return this.#balance;
        }

        deposit(amountToAdd) {
            this.validateEntry(amountToAdd)
            this.#balance += parseInt(amountToAdd);
        }

        withdraw(amountToWithdraw) {
            this.validateEntry(amountToWithdraw);
            if (amountToWithdraw > this.#balance) throw new Error('You do not have enough in your account');
            this.#balance -= parseInt(amountToWithdraw);
        }

        validateEntry(entryToValidate) {
            if (isNaN(entryToValidate) || entryToValidate === null) throw new Error('Please enter a valid number');
        }
    }

    class MockTransaction {
        #date;
        #amount;
        #transactionType;
        #balance = 0;
        constructor(date, amount, transactionType = '') {
            this.#date = date;
            this.#transactionType = transactionType;
            this.#amount = amount;
        }

        getAmount() {
            return this.#amount;
        }

        getFullTransaction() {
            return {
                date: this.#date,
                amount: this.#amount,
                transactionType: this.#transactionType,
                balance: this.#balance,
            }
        }

        setTransactionTypeAndBalance(transactionToAdd, balance) {
            this.#transactionType = transactionToAdd;
            this.#balance = balance
        }
    }

    let testAccount, testBalance, testTransaction;

    beforeEach(() => {
        testBalance = new MockBalance(0);
        testAccount = new MockAccount(testBalance);
    })



    it('should print statement to the console', () => {

        // ARRANGE
        const expected = "\ndate       || credit  || debit  || balance\n10/01/2012 || 1000.00 ||        || 1000.00"

        testTransaction = new MockTransaction('10/01/2012', 1000);
        testAccount.deposit(testTransaction);

        console.log(testAccount.getTransactions()[0].getFullTransaction())

        // ACT
        expect(Statement.printStatement(testAccount)).toBe(expected);


    })
})
