import Account from "../src/Account.js";

describe('Tests for Accounts', () => {

    let testAccount, testBalance;

    describe('Tests for call getBalance on Account', () => {

        class MockBalance {

            constructor(amount) {
            }
            getBalance() { return 10; }
        }

        beforeEach(() => {
            const testAmount = 10;
            testBalance = new MockBalance(testAmount);
            testAccount = new Account(testBalance);
        })

        afterEach(() => {
            testBalance = undefined;
            testAccount = undefined;

        })

        it('should check getBalance on Account is called', () => {

            // ARRANGE

            const balanceSpy = spyOn(testBalance, 'getBalance');

            // ACT
            testAccount.getBalance();

            // ASSERT
            expect(balanceSpy).toHaveBeenCalledTimes(1);

        });

        it('should return the account balance when called on Account', () => {

            // ARRANGE
            const expected = 10;
            //ACT
            // ASSERT
            expect(testAccount.getBalance()).toBe(expected);

        })
    });

    describe('Tests for deposit on Account', () => {

        class MockBalance {
            #balance
            constructor(amount = 0) {
                this.#balance = amount
            }
            getBalance() { return this.#balance }

            makeTransaction(transactionType, amountToAdd) { }
        }

        class MockTransaction {
            #date;
            #transactionType;
            #amount;
            #balance = 0
            constructor(date, amount, transactionType = '') {
                this.#date = new Date(date);
                this.#amount = amount;
                this.#transactionType = transactionType;

            }

            getAmount() {
                return this.#amount;
            }

            getTransactionType() {
                return 'credit';
            }

            getFullTransaction() {
                return {
                    date: this.#date,
                    amount: this.#amount,
                    transactionType: this.#transactionType,
                    balance: this.#balance,
                }
            }
            setTransactionBalance(balance) {
                this.#balance = balance;
            }
        }

        beforeEach(() => {
            testBalance = new MockBalance(10);
            testAccount = new Account(testBalance);
        })

        afterEach(() => {
            testBalance = undefined;
            testAccount = undefined;
        })

        it('should check deposit is called', () => {

            // ARRANGE
            const testDate = '2022-12-12';
            const testType = 'credit'
            const amountToDeposit = 100;
            const testTransaction = new MockTransaction(testDate, amountToDeposit, testType);
            const balanceSpy = spyOn(testBalance, 'makeTransaction');

            // ACT
            testAccount.makeTransaction(testTransaction);

            // ASSERT
            expect(balanceSpy).toHaveBeenCalledWith(testType, amountToDeposit);
        });


        it('should addTransaction is called when deposit is called and adds to accountTransactions array', () => {
            // ARRANGE
            const testDate = '2022-12-12';
            const testType = 'credit'
            const amountToDeposit = 100;
            const testTransaction = new MockTransaction(testDate, amountToDeposit, testType);
            const expected = 1;

            // ACT
            testAccount.makeTransaction(testTransaction);

            // ASSERT
            expect(testAccount.getTransactions().length).toBe(expected);

        });

        it('expect balanceSpy make transaction to have been called 3 times', () => {

            // ARRANGE
            const transactionArray = [
                new MockTransaction('13/12/2022', 50, `credit`),
                new MockTransaction('14/12/2022', 100, `credit`),
                new MockTransaction('13/12/2022', 70, `credit`),
            ]
            const newBalance = new MockBalance(0);
            const newAccount = new Account(newBalance);
            const balanceSpy = spyOn(newBalance, 'makeTransaction')
            const expected = 3;
            // ACT
            for (const transaction of transactionArray) {

                newAccount.makeTransaction(transaction);
            }

            // ASSERT
            expect(balanceSpy).toHaveBeenCalledTimes(expected);

        })

    });

    describe('withdrawal tests', () => {
        class MockBalance {
            #balance
            constructor(amount = 0) {
                this.#balance = amount
            }
            getBalance() { return this.#balance }

            makeTransaction(transactionType, amountToWithdraw) { };
        }

        class MockTransaction {
            #date;
            #amount;
            #transactionType;
            #balance = 0;

            constructor(date, amount, transactionType = '') {
                this.#date = new Date(date);
                this.#amount = amount;
                this.#transactionType = transactionType;

            }
            getTransactionType() {
                return 'debit';
            }

            getDate() {
                return this.#date;
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
            setTransactionBalance(balance) {
                this.#balance = balance;
            }
        }

        beforeEach(() => {
            testBalance = new MockBalance(100)
            testAccount = new Account(testBalance);
        })

        afterEach(() => {
            testBalance = undefined;
            testAccount = undefined;
        })
        it('should call makeTransaction should be called with the testTransaction ', () => {
            // ARRANGE
            const testDate = '2022-12-12';
            const amountToWithdraw = 50;
            const testType = 'debit'
            const balanceSpy = spyOn(testBalance, 'makeTransaction');
            const testTransaction = new MockTransaction(testDate, amountToWithdraw, testType);

            // ACT
            testAccount.makeTransaction(testTransaction);
            // ASSERT
            expect(balanceSpy).toHaveBeenCalledWith(testType, amountToWithdraw);
        })

        it('should addTransaction is called when withdraw is called and adds to accountTransactions array', () => {
            const testDate = '2022-12-12';
            const amountToWithdraw = 50;
            const testType = 'debit'
            const testTransaction = new MockTransaction(testDate, amountToWithdraw, testType);
            const expected = 1;

            // ACT
            testAccount.makeTransaction(testTransaction);

            // ASSERT
            expect(testAccount.getTransactions().length).toBe(expected);
        });

        it('add 3 withdraw transactions to the accountTransaction array and return a balance on the final array of 100', () => {

            // ARRANGE
            const transactionArray = [
                new MockTransaction('13/12/2022', 50, `debit`),
                new MockTransaction('14/12/2022', 100, `debit`),
                new MockTransaction('13/12/2022', 70, `debit`),
            ]
            const newBalance = new MockBalance(0);
            const newAccount = new Account(newBalance);
            const balanceSpy = spyOn(newBalance, 'makeTransaction')
            const expected = 3;
            // ACT
            for (const transaction of transactionArray) {

                newAccount.makeTransaction(transaction);
            }

            // ASSERT
            expect(balanceSpy).toHaveBeenCalledTimes(expected);

        });

    });

    describe('Account Transaction Tests', () => {
        class MockBalance {
            #balance
            constructor(amount) {
                this.#balance = amount
            }
            getBalance = () => { return this.#balance }

            getBalance = () => { return this.#balance }

            deposit = (amountToAdd) => {
                if (isNaN(amountToAdd)) throw new Error('Please enter a valid number')
                this.#balance += parseFloat(amountToAdd);
            }
        }

        class MockTransaction {
            #date;
            #transactionType;
            #amount;
            #balance = 0;
            constructor(date, amount, transactionType = '') {
                this.#date = new Date(date);
                this.#amount = amount;
                this.#transactionType = transactionType;

            }
            getDate() {
                return this.#date
            }
        }


        beforeEach(() => {
            testBalance = new MockBalance(100)
            testAccount = new Account(testBalance);
        })

        afterEach(() => {
            testBalance = undefined;
            testAccount = undefined;
        });

        it('should add deposit to accountTransactions', () => {

            // ARRANGE
            const dateToTest = '2022-11-12'
            const transactionType = 'credit'
            const amountToDeposit = 50;
            const testTransaction = new MockTransaction(dateToTest, amountToDeposit, transactionType)
            // ACT
            testAccount.addTransaction(testTransaction);

            // ASSERT
            expect(testAccount.getTransactions().length).toBe(1);

        });

        it('should after added to the array should return an instance of MockTransaction', () => {

            // ARRANGE
            const dateToTest = '2022-11-12'
            const transactionType = 'credit'
            const amountToDeposit = 50;
            const testTransaction = new MockTransaction(dateToTest, amountToDeposit, transactionType)
            // ACT
            testAccount.addTransaction(testTransaction);

            // ASSERT
            expect(testAccount.getTransactions()[0]).toBeInstanceOf(MockTransaction);
        });

        it('should add 3 transactions to the array', () => {

            // ARRANGE
            const transactionArray = [
                new MockTransaction('2022-11-12', 50, 'credit'),
                new MockTransaction('2022-11-13', 100, 'credit'),
                new MockTransaction('2022-11-14', 70, 'debit'),
            ]
            const expected = 3

            // ACT
            for (const transaction of transactionArray) {
                testAccount.addTransaction(transaction);
            }

            // ASSERT
            expect(testAccount.getTransactions().length).toBe(expected);
        });

    });

});
