import chalk from 'chalk';

class Statement {

    static statementHeader = `date       || credit  || debit   || balance`;

    static printStatement(account) {
        let statementArray = [Statement.statementHeader];
        for (const transaction of account.getTransactions()) {
            statementArray = [...statementArray, Statement.statementFormatter(transaction.getFullTransaction())]
        }
        statementArray.forEach(transaction => console.log(transaction));
    }

    static statementFormatter(detail) {
        const emptyString = '       ';
        if (detail.transactionType === 'debit') {
            return `${detail.date} || ${emptyString.padEnd(7)} || ${chalk.red(detail.amount.padEnd(7))} || ${detail.balance}`;
        }
        return `${detail.date} || ${chalk.green(detail.amount.padEnd(7))} || ${emptyString.padEnd(7)} || ${detail.balance}`;
    }


    // console.log(`${trans.date} || ${ chalk.green(trans.transactionType === 'credit' ? trans.amount : ' ') } || ${ chalk.red(trans.transactionType === 'debit' ? trans.amount : ' ') } || ${ trans.balance } `);
}

export default Statement;
