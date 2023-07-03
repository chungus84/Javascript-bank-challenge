import Statement from "../src/Statement.js";
import chalk from "chalk"

describe(`Statement Class tests`, () => {

    class MockAccount {
        #accountBalance;
        #accountTransactions = [];

        constructor(balanceObject) {
            this.#accountBalance = balanceObject;
        }

        makeTransaction(transactionObject) {

            this.#accountTransactions = [transactionObject, ...this.#accountTransactions];
        }
        getTransactions() {
            return this.#accountTransactions;
        }
    }

    class MockBalance {
        #balance;

        constructor(newBalance = 0) {
            this.#balance = parseFloat(newBalance);
        }

        /*
        I know we are not supposed to have logic in our mocks but with how I structured makeTransaction I need the mock
        makeTransaction to determine if the type of transaction is credit or a debit or I could have made two different methods
        i.e. makeTransactionCredit, makeTransactionDebit.  Not sure what the best practice would have been.
        */
        makeTransaction(transactionType, amount) {
            if (transactionType === `credit`) {
                this.#balance += amount;
            } else { this.#balance -= amount; }
        }
    }

    class MockTransaction {
        #date;
        #amount;
        #transactionType;
        #balance = 0.00;
        constructor(date, amount, transactionType = ``) {
            this.#date = new Date(date);
            this.#transactionType = transactionType;
            this.#amount = amount;
        }

        getFullTransaction() {
            return {
                date: this.#date.toLocaleDateString(`en-GB`),
                amount: this.#amount.toFixed(2),
                transactionType: this.#transactionType,
                balance: this.#balance.toFixed(2),
            }
        }
    }

    let testAccount, testBalance, testTransaction;

    beforeEach(() => {
        testBalance = new MockBalance(0);
        testAccount = new MockAccount(testBalance);
    });



    it(`printStatement should be called twice (header and transaction)`, () => {

        // ARRANGE
        const testAmount = 1000;
        const testType = `credit`;
        const logSpy = spyOn(global.console, `log`);
        testTransaction = new MockTransaction(`2012-01-10`, testAmount, testType);
        testAccount.makeTransaction(testTransaction);

        // ACT
        Statement.printStatement(testAccount)

        // ASSERT
        expect(logSpy).toHaveBeenCalledTimes(2);
    });

    it(`printStatement should be called 4 times (once for header and 3 x transactions)`, () => {

        // ARRANGE
        const transactionArray = [
            new MockTransaction(`2012-01-10`, 1000, `credit`),
            new MockTransaction(`2012-01-10`, 2000, `credit`),
            new MockTransaction(`2012-01-10`, 500, `credit`),

        ]
        const logSpy = spyOn(global.console, `log`);
        transactionArray.forEach(transaction => testAccount.makeTransaction(transaction));

        // ACT
        Statement.printStatement(testAccount);

        // ASSERT
        expect(logSpy).toHaveBeenCalledTimes(4);
    });

    it(`statementFormatter should space the padding and return green consistently for each credit in a statement row`, () => {

        // ARRANGE
        const deposit1 = new MockTransaction(`2022-12-10`, 2000, `credit`);
        const expected = `10/12/2022 || ${chalk.green(`2000.00`)} ||         || 0.00`;

        // ACT
        testAccount.makeTransaction(deposit1);
        const transactionDetails = testAccount.getTransactions();

        // ASSERT
        expect(Statement.statementFormatter(transactionDetails[0].getFullTransaction())).toEqual(expected);

    });

    it(`statementFormatter should space the padding and return red consistently for each debit in a statement row`, () => {
        // ARRANGE
        const withdrawal = new MockTransaction(`2022-12-10`, 1000, `debit`);
        const newBalance = new MockAccount(new MockBalance(2000));
        const expected = `10/12/2022 ||         || ${chalk.red(`1000.00`)} || 0.00`;

        // ACT
        newBalance.makeTransaction(withdrawal);
        const transactionDetails = newBalance.getTransactions();

        // ASSERT
        expect(Statement.statementFormatter(transactionDetails[0].getFullTransaction())).toEqual(expected);
    });
})
