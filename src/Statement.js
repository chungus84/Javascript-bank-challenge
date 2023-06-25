import chalk from 'chalk';

class Statement {

    static printStatement(account) {
        console.log("\ndate       || credit  || debit  || balance")
        for (const transaction of account.getTransactions()) {
            const trans = transaction.getFullTransaction()
            console.log(`${trans.date} || ${chalk.green(trans.transactionType === 'credit' ? trans.amount : '       ')} || ${chalk.red(trans.transactionType === 'debit' ? trans.amount : '      ')} || ${trans.balance}`);
        }

    }
}

export default Statement;
