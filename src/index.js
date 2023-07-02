import Account from "./Account.js";
import Balance from "./Balance.js";
import Transaction from "./Transaction.js";
import Statement from "./Statement.js";

const date1 = '2012-01-10';
const date2 = '2012-01-13';
const date3 = '2012-01-14';

const amount1 = 1000;
const amount2 = 2000;
const amount3 = 500;

const credit = 'credit';
const debit = 'debit';

const transactionArray = [
    new Transaction(date1, amount1, credit),
    new Transaction(date2, amount2, credit),
    new Transaction(date3, amount3, debit),
]

const newAccount = new Account(new Balance(0));
try {
    transactionArray.forEach(transaction => newAccount.makeTransaction(transaction));
} catch (error) {
    console.log(error.message);
}


Statement.printStatement(newAccount);
