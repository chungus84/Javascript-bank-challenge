import chalk from 'chalk';

class Statement {



    static printStatement(account) {
        let statementArray = ["date       || credit  || debit  || balance"];
        for (const transaction of account.getTransactions()) {
            statementArray = [...statementArray, Statement.statementFormatter(transaction.getFullTransaction())]
            //     console.log(`${trans.date} || ${chalk.green(trans.transactionType === 'credit' ? trans.amount : '       ')} || ${chalk.red(trans.transactionType === 'debit' ? trans.amount : '      ')} || ${trans.balance}`);
        }
        statementArray.forEach(transaction => console.log(transaction));

    }

    static statementFormatter(detail) {
        const emptyString = '       ';
        return `${detail.date} || ${detail.transactionType === 'credit' ? chalk.green(detail.amount) + " ||" + emptyString : emptyString + " || " + chalk.red(detail.amount)} || ${detail.balance}`
        // statementArray = [...statementArray, statementEntry]
        // return statementArray


    }
}

export default Statement;
