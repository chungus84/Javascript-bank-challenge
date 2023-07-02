import Balance from "../src/Balance.js";

describe(`Balance Test Suite`, () => {

    let testBalance;

    describe(`getBalance Tests`, () => {
        it(`should check getBalance is called on Balance and returns the balance amount`, () => {

            // ARRANGE
            testBalance = new Balance(10);
            const expected = 10;

            // ACT

            // ASSERT
            expect(testBalance.getBalance()).toBe(expected);
        });
    });

    describe(`makeTransaction credit tests`, () => {

        beforeEach(() => {
            testBalance = new Balance(10);
        });

        afterEach(() => {
            testBalance = undefined;
        });

        it(`should add the specified amount to balance if transactionType === "credit"`, () => {

            // ARRANGE
            const amountToAdd = 100;
            const expected = 110;
            const transactionType = `credit`
            // ACT
            testBalance.makeTransaction(transactionType, amountToAdd);
            // ASSERT
            expect(testBalance.getBalance()).toBe(expected);

        });

        it(`should add three transactions and show a balance of 230`, () => {

            // ARRANGE
            const transactionArray = [
                [`credit`, 50],
                [`credit`, 100],
                [`credit`, 70],
            ]
            const expected = 230;
            // ACT
            for (const transaction of transactionArray) {
                testBalance.makeTransaction(transaction[0], transaction[1]);
            }
            // ASSERT
            expect(testBalance.getBalance()).toBe(expected);
        })

        it(`should convert a string that contains a parsable number e.g "100" into a number`, () => {
            // ARRANGE
            const amountToDeposit = `100`;
            const expected = 110;
            const transactionType = `credit`
            // ACT
            testBalance.makeTransaction(transactionType, amountToDeposit)
            // ASSERT
            expect(testBalance.getBalance()).toBe(expected);
        });

        it(`should throw an error if string isNaN()`, () => {
            // ARRANGE
            const amountToDeposit = `hello`;
            const transactionType = `credit`
            // ACT
            // ASSERT
            expect(() => { testBalance.makeTransaction(transactionType, amountToDeposit) }).toThrowError();
        });

        it(`should throw an error if given a null value`, () => {
            // ARRANGE
            const nullDeposit = null;
            const transactionType = `credit`
            // ACT
            // ASSERT
            expect(() => { testBalance.makeTransaction(transactionType, nullDeposit) }).toThrowError();
        });

        it(`should throw an error if given an undefined value`, () => {
            // ARRANGE
            const undefinedDeposit = undefined;
            const transactionType = `credit`
            // ACT
            // ASSERT
            expect(() => { testBalance.makeTransaction(transactionType, undefinedDeposit) }).toThrowError();
        });
        it(`should throw an error if number is less than 0 (-1)`, () => {
            const lessThanZeroAmount = -1;
            const transactionType = `credit`

            expect(() => { testBalance.makeTransaction(transactionType, lessThanZeroAmount) }).toThrowError();

        })

    });

    describe(`makeTransaction debit tests`, () => {

        beforeEach(() => {
            testBalance = new Balance(100);
        });

        afterEach(() => {
            testBalance = undefined;
        });

        it(`should debit 50 from the balance when called`, () => {

            // ARRANGE
            const expected = 50;
            const amountToWithdraw = 50;
            const transactionType = `debit`
            // ACT
            testBalance.makeTransaction(transactionType, amountToWithdraw);
            // ASSERT
            expect(testBalance.getBalance()).toBe(expected);
        })

        it(`should throw an error if the amountToWithdraw is greater than the balance`, () => {

            // ARRANGE
            const amountToTakeout = 120;
            const transactionType = `debit`
            // ACT
            // ASSERT
            expect(() => { testBalance.makeTransaction(transactionType, amountToTakeout) }).toThrowError();
        });

        it(`should convert a string that contains a parsable number e.g "50" into an int`, () => {
            // ARRANGE
            const amountToWithdraw = `50`;
            const expected = 50;
            const transactionType = `debit`
            // ACT
            testBalance.makeTransaction(transactionType, amountToWithdraw);
            // ASSERT
            expect(testBalance.getBalance()).toBe(expected);
        });

        it(`should throw an error if string isNaN()`, () => {
            // ARRANGE
            const amountToDeposit = `hello`;
            const transactionType = `debit`
            // ACT
            // ASSERT
            expect(() => { testBalance.makeTransaction(transactionType, amountToDeposit) }).toThrowError();
        });

        it(`should throw an error if given a null value`, () => {
            // ARRANGE
            const nullDeposit = null;
            const transactionType = `debit`
            // ACT
            // ASSERT
            expect(() => { testBalance.makeTransaction(transactionType, nullDeposit) }).toThrowError();
        });

        it(`should throw an error if given an undefined value`, () => {
            // ARRANGE
            const undefinedDeposit = undefined;
            const transactionType = `debit`
            // ACT
            // ASSERT
            expect(() => { testBalance.makeTransaction(transactionType, undefinedDeposit) }).toThrowError();
        });
    });

    describe(`ValidateEntry Tests`, () => {

        beforeEach(() => {
            testBalance = new Balance(50);
        });

        afterEach(() => {
            testBalance = undefined;
        });

        it(`should throw an error if given a string "hello"`, () => {

            // ARRANGE
            const stringEntry = `hello`;
            // ACT
            // ASSERT
            expect(() => { testBalance.validateEntry(stringEntry) }).toThrowError();
        });

        it(`should throw error if given a null value`, () => {

            // ARRANGE
            const nullEntry = null;
            // ACT
            // ASSERT
            expect(() => { testBalance.validateEntry(nullEntry) }).toThrowError();
        });
    });

});
