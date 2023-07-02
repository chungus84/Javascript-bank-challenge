import Account from "../src/Account.js";
import Statement from "../src/Statement.js";
import chalk from 'chalk'

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
            this.#balance = parseFloat(newBalance);
        }

        getBalance() {
            return this.#balance;
        }

        deposit(amountToAdd) {
            this.validateEntry(amountToAdd)
            this.#balance += parseFloat(amountToAdd);
        }

        withdraw(amountToWithdraw) {
            this.validateEntry(amountToWithdraw);
            if (amountToWithdraw > this.#balance) throw new Error('You do not have enough in your account');
            this.#balance -= parseFloat(amountToWithdraw);
        }

        validateEntry(entryToValidate) {
            if (isNaN(entryToValidate) || entryToValidate === null) throw new Error('Please enter a valid number');
        }
    }

    class MockTransaction {
        #date;
        #amount;
        #transactionType;
        #balance = 0.00;
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
                amount: this.#amount.toFixed(2),
                transactionType: this.#transactionType,
                balance: this.#balance.toFixed(2),
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



    it('printStatement should be called twice (header and transaction)', () => {

        // ARRANGE

        const testAmount = 1000
        const logSpy = spyOn(global.console, 'log')
        testTransaction = new MockTransaction('10/01/2012', testAmount);
        testAccount.deposit(testTransaction);

        Statement.printStatement(testAccount)

        // ACT
        expect(logSpy).toHaveBeenCalledTimes(2);


    });

    it('printStatement should be called 4 times (once for header and 3 x transactions)', () => {

        // ARRANGE

        const transactionArray = [
            new MockTransaction('10/01/2012', 1000),
            new MockTransaction('10/01/2012', 2000),
            new MockTransaction('10/01/2012', 500)

        ]
        const logSpy = spyOn(global.console, 'log')

        transactionArray.forEach(transaction => testAccount.deposit(transaction));

        Statement.printStatement(testAccount);

        expect(logSpy).toHaveBeenCalledTimes(4);


    })

    it('statementFormatter should space the padding consistently for each deposit in a statement row', () => {

        // ARRANGE
        const deposit1 = new MockTransaction('10/12/2022', 2000);

        testAccount.deposit(deposit1);


        const expected = `10/12/2022 || ${chalk.green('2000.00')} ||         || 2000.00`;

        const transactionDetails = testAccount.getTransactions();


        expect(Statement.statementFormatter(transactionDetails[0].getFullTransaction())).toEqual(expected);

    });

    it('statementFormatter should space the padding consistently for each withdrawal in a statement row', () => {
        // ARRANGE
        const withdrawal = new MockTransaction('10/12/2022', 1000);
        const newBalance = new MockAccount(new MockBalance(2000))

        newBalance.withdraw(withdrawal);


        const expected = `10/12/2022 ||         || ${chalk.red('1000.00')} || 1000.00`;

        const transactionDetails = newBalance.getTransactions();

        expect(Statement.statementFormatter(transactionDetails[0].getFullTransaction())).toEqual(expected);
    })
})
