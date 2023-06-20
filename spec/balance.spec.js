import Balance from "../src/Balance.js";

describe('Balance Test Suite', () => {

    let testBalance;

    it('should check getBalance is called on Balance and returns the balance amount', () => {

        // ARRANGE
        testBalance = new Balance(10);
        const expected = 10;

        // ACT

        // ASSERT
        expect(testBalance.getBalance()).toBe(expected);
    });
})
