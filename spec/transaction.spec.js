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
        testTransaction = new Transaction(transactionDate, transactionType, amount);

        // ASSERT

        expect(testTransaction).toBeInstanceOf(Transaction);

    });

})
