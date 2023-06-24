import Account from "../src/Account.js";

describe('Tests for Accounts', () => {

    let testAccount, testBalance;

    describe('Tests for call getBalance on Account', () => {

        class MockBalance {
            #balance
            constructor(amount) {
                this.#balance = amount;
            }
            getBalance = () => { return this.#balance }
        }
        class MockTransaction {
            #date;
            #transactionType;
            #amount;
            constructor(date, amount, transactionType = '') {
                this.#date = date;
                this.#amount = amount;
                this.#transactionType = transactionType;

            }
            getAmount() {
                return this.#amount;
            }
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
            #balance = 0
            constructor(date, amount, transactionType = '') {
                this.#date = date;
                this.#amount = amount;
                this.#transactionType = transactionType;

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
                this.#balance = balance;
            }
        }

        beforeEach(() => {
            const testAmount = 10;
            testBalance = new MockBalance(10);
            testAccount = new Account(testBalance);
        })

        afterEach(() => {
            testBalance = undefined;
            testAccount = undefined;
        })

        it('should check deposit is called', () => {

            // ARRANGE
            const testDate = '12/12/2022';
            const testType = 'credit'
            const amountToDeposit = 100;
            const testTransaction = new MockTransaction(testDate, amountToDeposit, testType);
            const balanceSpy = spyOn(testBalance, 'deposit');
            // console.log(testTransaction.getFullTransaction().amount);

            // ACT
            testAccount.deposit(testTransaction);
            // ASSERT
            expect(balanceSpy).toHaveBeenCalledWith(amountToDeposit);
        });

        it('should check deposit when called in the Account class instance adds the amount to the balance', () => {

            // ARRANGE
            const testDate = '12/12/2022';
            const testType = 'credit'
            const amountToDeposit = 100;
            const testTransaction = new MockTransaction(testDate, amountToDeposit, testType);
            const expected = 110;
            // ACT
            testAccount.deposit(testTransaction)
            // ASSERT
            expect(testAccount.getBalance()).toBe(expected);

        });

        it('should convert a string that contains a parsable number e.g "100" into an int when called from Account class instance', () => {
            // ARRANGE
            const testDate = '12/12/2022';
            const testType = 'credit'
            const amountToDeposit = '100';
            const testTransaction = new MockTransaction(testDate, amountToDeposit, testType);
            const expected = 110;
            // ACT
            testAccount.deposit(testTransaction)
            // ASSERT
            expect(testAccount.getBalance()).toBe(expected);
        });

        it('should throw an error if string isNaN()', () => {
            // ARRANGE
            const testDate = '12/12/2022';
            const testType = 'credit'
            const amountToDeposit = 'hello';
            const testTransaction = new MockTransaction(testDate, amountToDeposit, testType);
            // ACT
            // ASSERT
            expect(() => { testAccount.deposit(testTransaction) }).toThrowError();
        });

        it('should addTransaction is called when deposit is called and adds to accountTransactions array', () => {
            // ARRANGE
            const testDate = '12/12/2022';
            const testType = 'credit'
            const amountToDeposit = 100;
            const testTransaction = new MockTransaction(testDate, amountToDeposit, testType);
            const expected = 1;

            // ACT
            testAccount.deposit(testTransaction);

            // ASSERT
            expect(testAccount.getTransactions().length).toBe(expected);

        });

        it('add 3 deposit transaction to the accountTransaction array and return a balance on the final array of 220', () => {

            // ARRANGE
            const transactionArray = [
                new MockTransaction('13/12/2022', 50),
                new MockTransaction('14/12/2022', 100),
                new MockTransaction('13/12/2022', 70),
            ]

            const newAccount = new Account(new MockBalance());


            for (const transaction of transactionArray) {
                newAccount.deposit(transaction);
            }
            const expected = 220;

            // ACT
            const lastItem = newAccount.getTransactions().slice(-1)
            const actual = lastItem[0].getFullTransaction().balance

            // ASSERT
            expect(actual).toBe(expected);

        })

    });

    describe('withdrawal tests', () => {
        class MockBalance {
            #balance
            constructor(amount = 0) {
                this.#balance = amount
            }
            getBalance = () => { return this.#balance }

            withdraw = amountToWithdraw => this.#balance -= amountToWithdraw;
        }

        class MockTransaction {
            #date;
            #amount;
            #transactionType;
            #balance = 0;

            constructor(date, amount, transactionType = '') {
                this.#date = date;
                this.#amount = amount;
                this.#transactionType = transactionType;

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
        it('should call withdraw in Account class instance', () => {
            // ARRANGE
            const testDate = '12/12/2022';
            const amountToWithdraw = 50;
            const balanceSpy = spyOn(testBalance, 'withdraw');
            const testTransaction = new MockTransaction(testDate, amountToWithdraw);

            // ACT
            testAccount.withdraw(testTransaction);
            // ASSERT
            expect(balanceSpy).toHaveBeenCalledWith(amountToWithdraw);
        })

        it('should call withdraw from balance and remove 50 from balance', () => {
            // ARRANGE
            const testDate = '12/12/2022';
            const expected = 50;
            const amountToWithdraw = 50;
            const testTransaction = new MockTransaction(testDate, amountToWithdraw);
            // ACT
            testAccount.withdraw(testTransaction);
            // ASSERT
            expect(testAccount.getBalance()).toBe(expected);
        });

        it('should addTransaction is called when withdraw is called and adds to accountTransactions array', () => {
            const testDate = '12/12/2022';
            const amountToWithdraw = 50;
            const testTransaction = new MockTransaction(testDate, amountToWithdraw);
            const expected = 1;

            // ACT
            testAccount.withdraw(testTransaction);

            // ASSERT
            expect(testAccount.getTransactions().length).toBe(expected);
        });

        it('add 3 withdraw transactions to the accountTransaction array and return a balance on the final array of 100', () => {

            // ARRANGE
            const transactionArray = [
                new MockTransaction('13/12/2022', 50),
                new MockTransaction('14/12/2022', 20),
                new MockTransaction('13/12/2022', 30),
            ]

            const newAccount = new Account(new MockBalance(200));


            for (const transaction of transactionArray) {
                newAccount.withdraw(transaction);
            }
            const expected = 100;

            // ACT
            const lastItem = newAccount.getTransactions().slice(-1)
            const actual = lastItem[0].getFullTransaction().balance

            // ASSERT
            expect(actual).toBe(expected);

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
                this.#date = date;
                this.#amount = amount;
                this.#transactionType = transactionType;

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
            const dateToTest = '12/11/2022'
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
            const dateToTest = '12/11/2022'
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
                new MockTransaction('13/12/2022', 50, 'credit'),
                new MockTransaction('14/12/2022', 100),
                new MockTransaction('13/12/2022', 70, 'debit'),
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
