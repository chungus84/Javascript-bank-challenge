import Account from "../src/Account.js";

describe('Tests for Accounts', () => {

    let testAccount, testBalance;

    describe('Tests for call getBalance on Account', () => {

        class MockBalance {
            #balance
            constructor(balance) {
                this.#balance = balance;
            }
            getBalance = () => { return this.#balance }
        }

        beforeEach(() => {
            testBalance = new MockBalance(10)
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
            constructor(balance) {
                this.#balance = balance;
            }
            getBalance = () => { return this.#balance }

            deposit = (amountToAdd) => {
                if (isNaN(amountToAdd)) throw new Error('Please enter a valid number')
                this.#balance += parseInt(amountToAdd);
            }
        }

        beforeEach(() => {
            testBalance = new MockBalance(10)
            testAccount = new Account(testBalance);
        })

        afterEach(() => {
            testBalance = undefined;
            testAccount = undefined;
        })

        it('should check deposit is called', () => {

            // ARRANGE
            const amountToDeposit = 100;
            const balanceSpy = spyOn(testBalance, 'deposit');

            // ACT
            testAccount.deposit(amountToDeposit);
            // ASSERT
            expect(balanceSpy).toHaveBeenCalledWith(amountToDeposit);
        });

        it('should check deposit when called in the Account class instance adds the amount to the balance', () => {

            // ARRANGE
            const amountToDeposit = 100;
            const expected = 110;
            // ACT
            testAccount.deposit(amountToDeposit)
            // ASSERT
            expect(testAccount.getBalance()).toBe(expected);

        });

        it('should convert a string that contains a parsable number e.g "100" into an int when called from Account class instance', () => {
            // ARRANGE
            const amountToDeposit = '100';
            const expected = 110;
            // ACT
            testAccount.deposit(amountToDeposit)
            // ASSERT
            expect(testAccount.getBalance()).toBe(expected);
        });

        it('should throw an error if string isNaN()', () => {
            // ARRANGE
            const amountToDeposit = 'hello';
            // ACT
            // ASSERT
            expect(() => { testAccount.deposit(amountToDeposit) }).toThrowError();
        });


    });

    describe('withdrawal tests', () => {
        class MockBalance {
            #balance
            constructor(balance) {
                this.#balance = balance;
            }
            getBalance = () => { return this.#balance }

            withdraw = amountToWithdraw => this.#balance -= amountToWithdraw;
        }

        beforeEach(() => {
            testBalance = new MockBalance(100)
            testAccount = new Account(testBalance);
        })

        afterEach(() => {
            testBalance = undefined;
            testAccount = undefined;
        })
        it('should call withdraw in Account class isntance', () => {
            // ARRANGE
            const amountToWithdraw = 50;
            const balanceSpy = spyOn(testBalance, 'withdraw');

            // ACT
            testAccount.withdraw(amountToWithdraw);
            // ASSERT
            expect(balanceSpy).toHaveBeenCalledWith(amountToWithdraw);
        })

        it('should call withdraw from balance and remove 50 from balance', () => {
            // ARRANGE
            const expected = 50;
            const amountToWithdraw = 50;
            // ACT
            testAccount.withdraw(amountToWithdraw);
            // ASSERT
            expect(testAccount.getBalance()).toBe(expected);
        })
    })
});
