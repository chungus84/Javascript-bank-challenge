import Account from "./Account.js";
import Balance from "./Balance.js";
import Transaction from "./Transaction.js";
import Statement from "./Statement.js";

const transactionArray = [
    new Transaction(`2012-01-10`, 1000, `credit`),
    new Transaction(`2012-01-13`, 2000, `credit`),
]

const transactionWithdraw = new Transaction(`2012-01-14`, 500, `debit`);

const newAccount = new Account(new Balance(0));

transactionArray.forEach(transaction => newAccount.makeTransaction(transaction));
newAccount.makeTransaction(transactionWithdraw);

Statement.printStatement(newAccount);


const anotherAccount = new Account(new Balance(0));


const deposit1 = new Transaction(`2023-02-01`, 3000, `credit`);
const deposit2 = new Transaction(`2023-02-03`, 200, `credit`);
const withdrawal = new Transaction(`2023-02-04`, 500, `debit`);

anotherAccount.makeTransaction(deposit1)
anotherAccount.makeTransaction(deposit2)
anotherAccount.makeTransaction(withdrawal);

const accountTransaction = anotherAccount.getTransactions()




Statement.printStatement(anotherAccount);

const oneMoreBalance = new Balance(49);
try {
    oneMoreBalance.makeTransaction(`debit`, null);
} catch (error) {
    console.log(error.message);
}
