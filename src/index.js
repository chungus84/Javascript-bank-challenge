import Account from "./Account.js";
import Balance from "./Balance.js";
import Transaction from "./Transaction.js";
import Statement from "./Statement.js";

const transactionArray = [
    new Transaction('2012-01-10', 1000),
    new Transaction('2012-01-13', 2000),
]

const transactionWithdraw = new Transaction('2012-01-14', 500);

const newAccount = new Account(new Balance(0));

transactionArray.forEach(transaction => newAccount.deposit(transaction));
newAccount.withdraw(transactionWithdraw);

Statement.printStatement(newAccount);


const anotherAccount = new Account(new Balance(0));

const deposit1 = new Transaction('2023-02-01', 3000);
const deposit2 = new Transaction('2023-02-03', 200);
const withdrawal = new Transaction('2023-02-04', 500);

anotherAccount.deposit(deposit1)
anotherAccount.deposit(deposit2)
anotherAccount.withdraw(withdrawal);

const accountTransaction = anotherAccount.getTransactions()




Statement.printStatement(anotherAccount);
