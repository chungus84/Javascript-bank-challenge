class Statement {

    static printStatement(account) {
        console.log("\ndate       || credit  || debit  || balance")
        for (const transaction of account.getTransactions()) {
            const trans = transaction.getFullTransaction()
            console.log(`${trans.date} || ${trans.transactionType === 'credit' ? trans.amount : ''} || ${trans.transactionType === 'debit' ? trans.amount : '     '} || ${trans.balance}`);
        }

    }
}

export default Statement;
