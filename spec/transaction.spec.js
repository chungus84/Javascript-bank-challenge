import Transaction from "../src/Transaction.js";

describe('Transaction Tests', () => {

    let testTransaction;

    class MockBalance {

        #balance;

        constructor(newBalance = 0) {
            this.#balance = newBalance;
        }

        getBalance() {
            return this.#balance;
        }
    }

    afterEach(() => {
        testTransaction = undefined;
    })

    it('should create a Transaction data object', () => {

        // ARRANGE
        const amount = 50;
        const transactionType = 'credit';
        const transactionDate = '10/10/2010';

        // ACT
        testTransaction = new Transaction(transactionDate, amount, transactionType);

        // ASSERT

        expect(testTransaction).toBeInstanceOf(Transaction);

    });

    it('should return amount (50) from Transaction instance object', () => {

        // ARRANGE
        const amount = 50
        const transactionType = 'credit';
        const transactionDate = '10/10/2010';
        testTransaction = new Transaction(transactionDate, amount, transactionType);


        //ACT
        const actual = testTransaction.getAmount();

        // ASSERT
        expect(actual).toBe(amount);

    })


    it('getFullTransaction should return all fields in an object', () => {
        // ARRANGE
        const amount = 50;
        const transactionType = 'credit';
        const transactionDate = '10/10/2010';
        testTransaction = new Transaction(transactionDate, amount, transactionType);
        const expected = {
            date: transactionDate,
            amount: amount.toFixed(2),
            transactionType: transactionType,
            balance: '0.00',
        }

        // ACT
        const actual = testTransaction.getFullTransaction();

        // ASSERT
        expect(actual).toEqual(expected);

    });

    it('setTransactionTypeAndBalance should set the transactionType', () => {

        // ARRANGE
        const amount = 60;
        const transactionDate = '10/10/2010';
        const testBalance = new MockBalance(100);
        testTransaction = new Transaction(transactionDate, amount);
        const expected = new Transaction(transactionDate, amount, 'credit', 100);
        const transactionType = 'credit'

        // ACT
        testTransaction.setTransactionTypeAndBalance(transactionType, testBalance.getBalance());


        // ASSERT
        expect(testTransaction).toEqual(expected)
    });

})
