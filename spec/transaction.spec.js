import Transaction from "../src/Transaction.js";

describe('Transaction Tests', () => {

    let testTransaction;

    afterEach(() => {
        testTransaction = undefined;
    })

    it('should create a Transaction data object', () => {

        // ARRANGE
        const amount = 50;
        const transactionType = 'deposit';
        const transactionDate = '10/10/2010';

        // ACT
        testTransaction = new Transaction(transactionDate, amount, transactionType);

        // ASSERT

        expect(testTransaction).toBeInstanceOf(Transaction);

    });

    it('should return amount (50) from Transaction instance object', () => {

        // ARRANGE
        const amount = 50;
        const transactionType = 'deposit';
        const transactionDate = '10/10/2010';
        testTransaction = new Transaction(transactionDate, amount, transactionType);
        const expected = {
            date: transactionDate,
            transactionType: transactionType,
            amount: amount
        }

        //ACT
        const actual = testTransaction.getAmount();

        // ASSERT
        expect(actual).toBe(amount);

    })


    it('getFullTransaction should return all fields in an object', () => {
        // ARRANGE
        const amount = 50;
        const transactionType = 'deposit';
        const transactionDate = '10/10/2010';
        testTransaction = new Transaction(transactionDate, amount, transactionType);
        const expected = {
            date: transactionDate,
            amount: amount,
            transactionType: transactionType,
        }

        // ACT
        const actual = testTransaction.getFullTransaction();

        // ASSERT
        expect(actual).toEqual(expected);

    })

})
