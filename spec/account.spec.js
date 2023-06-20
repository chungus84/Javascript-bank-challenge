import Account from "../src/Account.js";

describe('Tests for Accounts', () => {

    describe('Tests for call getBalance on Account', () => {
        class MockBalance {
            #balance
            constructor(balance) {
                this.#balance = balance;
            }
            getBalance = () => { }
        }

        it('should check getBalance on Account is called', () => {

            // ARRANGE
            const testBalance = new MockBalance(10)
            const testAccount = new Account(testBalance);
            const balanceSpy = spyOn(testBalance, 'getBalance');

            // ACT
            testAccount.getBalance();

            // ASSERT
            expect(balanceSpy).toHaveBeenCalledTimes(1);

        });

    });
});
