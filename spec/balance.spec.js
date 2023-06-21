import Balance from "../src/Balance.js";

describe('Balance Test Suite', () => {

    let testBalance;

    describe('getBalance Tests', () => {
        it('should check getBalance is called on Balance and returns the balance amount', () => {

            // ARRANGE
            testBalance = new Balance(10);
            const expected = 10;

            // ACT

            // ASSERT
            expect(testBalance.getBalance()).toBe(expected);
        });
    });

    describe('deposit Tests', () => {

        beforeEach(() => {
            testBalance = new Balance(10);
        });

        afterEach(() => {
            testBalance = undefined;
        });

        it('should add the specified amount to balance', () => {

            // ARRANGE
            const amountToAdd = 100;
            const expected = 110;
            // ACT
            testBalance.deposit(amountToAdd);
            // ASSERT
            expect(testBalance.getBalance()).toBe(expected);

        });

        it('should convert a string that contains a parsable number e.g "100" into an int', () => {
            // ARRANGE
            const amountToDeposit = '100';
            const expected = 110;
            // ACT
            testBalance.deposit(amountToDeposit)
            // ASSERT
            expect(testBalance.getBalance()).toBe(expected);
        });

        it('should throw an error if string isNaN()', () => {
            // ARRANGE
            const amountToDeposit = 'hello';
            // ACT
            // ASSERT
            expect(() => { testBalance.deposit(amountToDeposit) }).toThrowError();
        });

        it('should throw an error if given a null value', () => {
            // ARRANGE
            const nullDeposit = null;
            // ACT
            // ASSERT
            expect(() => { testBalance.deposit(nullDeposit) }).toThrowError();
        });

        it('should throw an error if given an undefined value', () => {
            // ARRANGE
            const undefinedDeposit = undefined;
            // ACT
            // ASSERT
            expect(() => { testBalance.deposit(undefinedDeposit) }).toThrowError();
        });

    });

    describe('withdraw tests', () => {

        beforeEach(() => {
            testBalance = new Balance(100);
        });

        afterEach(() => {
            testBalance = undefined;
        });

        it('should withdraw 50 from the balance when called', () => {

            // ARRANGE
            const expected = 50;
            const amountToWithdraw = 50;
            // ACT
            testBalance.withdraw(amountToWithdraw);
            // ASSERT
            expect(testBalance.getBalance()).toBe(expected);
        })

        it('should throw an error if the amountToWithdraw is greater than the balance', () => {

            // ARRANGE
            const amountToTakeout = 120;
            // ACT
            // ASSERT
            expect(() => { testBalance.withdraw(amountToTakeout) }).toThrowError();
        });

        it('should convert a string that contains a parsable number e.g "50" into an int', () => {
            // ARRANGE
            const amountToWithdraw = '50';
            const expected = 50;
            // ACT
            testBalance.withdraw(amountToWithdraw);
            // ASSERT
            expect(testBalance.getBalance()).toBe(expected);
        });

        it('should throw an error if string isNaN()', () => {
            // ARRANGE
            const amountToDeposit = 'hello';
            // ACT
            // ASSERT
            expect(() => { testBalance.withdraw(amountToDeposit) }).toThrowError();
        });

        it('should throw an error if given a null value', () => {
            // ARRANGE
            const nullDeposit = null;
            // ACT
            // ASSERT
            expect(() => { testBalance.withdraw(nullDeposit) }).toThrowError();
        });
    })


});
