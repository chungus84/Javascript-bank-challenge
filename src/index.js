import Account from "./Account.js";
import Balance from "./Balance.js";
import Transaction from "./Transaction.js";
import Statement from "./Statement.js";

const transactionArray = [
    new Transaction('10/01/2012', 1000),
    new Transaction('13/01/2012', 2000),
]

const transactionWithdraw = new Transaction('14/01/2012', 500);

const newAccount = new Account(new Balance(0));

transactionArray.forEach(transaction => newAccount.deposit(transaction));
newAccount.withdraw(transactionWithdraw);

Statement.printStatement(newAccount);
