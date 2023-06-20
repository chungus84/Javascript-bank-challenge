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
});
