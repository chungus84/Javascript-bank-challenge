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


});
