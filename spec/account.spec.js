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

            deposit = (amountToAdd) => { this.#balance += amountToAdd }
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
    })
});
