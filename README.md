# Bank

This challenge helps you practice your OO design skills.

You'll work alone, and you'll also review your own code so you can practice reflecting on and improving your own work.

### My Approach to the bank challenge
I have designed my solution to ensure that my classes are loosely coupled but highly cohesive and they are all self-encapsulated.  My 4 classes are as follows:

Account:  The class the user will be interacting with the most, requires a balance object on instantiation and also has a accountTransaction array which will hold a Transaction object for each transaction for the account.

Balance: Responsible for the handling the current balance of an account as well as validation and errors

Transaction: To handle the data structure of each transaction made to be stored in the accountTransaction array on the account object.

Statement: Holds 2 static methods which will format and print the accounts' statement.

Domain Models are further down.

### Instructions
- On installation run npm install to install dependencies
- To run tests run npm test in the terminal
- To run the app run node src/index.js

## Specification

### Requirements

* Results of your code should display via the JavaScript console.  (NB: You don't need to implement a command line interface that takes user input from STDIN.)
* Deposits, withdrawal.
* Account statement (date, credit or debit amount, balance) printing.
* Data can be kept in memory (it doesn't need to be stored to a database or anything).

### Acceptance criteria

**Given** a client makes a deposit of 1000 on 10-01-2012
**And** a deposit of 2000 on 13-01-2012
**And** a withdrawal of 500 on 14-01-2012
**When** she prints her bank statement
**Then** she would see

```
date       || credit  || debit  || balance
14/01/2012 ||         || 500.00 || 2500.00
13/01/2012 || 2000.00 ||        || 3000.00
10/01/2012 || 1000.00 ||        || 1000.00
```


#### Standard
- [ ] Meets the spec
- [ ] Developed test-first
- [ ] Passes tests and code is clean and well formatted
- [ ] Encapsulates adding and storing Transactions in a class
- [ ] Encapsulates Statement formatting in a class
- [ ] Encapsulates Transaction data in a class



#### User Stories & Domain Models Standard
```
As a user,
I want to see my bank balance,
so I know how much I have in my account.

|  Objects   |  Properties               |   Messages                    |  Output    |
| ---------- | ------------------------- | ----------------------------- | ---------- |
|  Balance   | balance @float            | getBalance()                  | @float     |
|  Account   | AccountBalance = @Balance | getBalance()                  | @float     |

As a user,
I want to deposit an amount of money,
 so I can add money to an account.

|  Objects    |  Properties                        |   Messages                   |  Output  |
| ----------- | ---------------------------------- | -----------------------------| -------- |
|  Balance    | balance @float                     | makeTransaction(@float)      | @void    |
|  Account    | accountBalance = @Balance          | makeTransaction(@float)      | @void    |
|             | accountTransactions [@Transaction] | validateEntry()              | @boolean |
|             |                                    | getBalance()                 | @float   |
|             |                                    | addTransaction(@Transaction) | @void    |
| Transaction | date @Date                         | getTransactionType()         | @string  |
|             | amount @float                      | getAmount()                  | @float   |
|             | transactionType @string            | setTransactionBalance(@float)| @void    |
|             | balance @float                     |                              |          |


As a user,
I want to withdraw an amount of money,
so I can use my money

|  Objects    |  Properties                        |   Messages                   |  Output  |
| ----------- | ---------------------------------- | -----------------------------| -------- |
|  Balance    | balance @float                     | makeTransaction(@float)      | @void    |
|  Account    | accountBalance = @Balance          | makeTransaction(@float)      | @void    |
|             | accountTransactions [@Transaction] | validateEntry()              | @boolean |
|             |                                    | getBalance()                 | @float   |
|             |                                    | addTransaction(@Transaction) | @void    |
| Transaction | date @Date                         | getTransactionType()         | @string  |
|             | amount @float                      | getAmount()                  | @float   |
|             | transactionType @string            | setTransactionBalance(@float)| @void    |
|             | balance @float                     |                              |          |

As a user,
I want to show all deposits I have made,
So I can keep track of my transactions.

|  Objects        |  Properties                       |   Messages        |  Output  |
| --------------- | --------------------------------- | ------------------| -------- |
|  Account        | accountTransactions[@Transaction] | addTransaction()  | @void    |
|  Transaction    |                                   |                   |          |


As a user,
I want to add all withdrawals I have made to accountTransactions,
So I can keep track of my transactions.

|  Objects        |  Properties                       |   Messages        |  Output  |
| --------------- | --------------------------------- | ------------------| -------- |
|  Account        | accountTransactions[@Transaction] | addTransaction()  | @void    |
|  Transaction    |                                   |                   |          |


As a user,
I want to print statement to show my deposits, withdrawals and balance in date order.
To show my account activity.

|  Objects        |  Properties                       |   Messages           |  Output  |
| --------------- | --------------------------------- | ---------------------| -------- |
|  Account        | accountTransactions[@Transaction] | getTransactions()    | @Array   |
|  Statement      | statementHeader @String           | printStatement()     | @String  |
|                 |                                   | statementFormatter() | @String  |
```

#### Extended
- [ ] Can you format the console output?  Credited values should be GREEN and debited values should be RED.  The balance should be GREEN if positive and RED if negative

#### Extended user stories and domain models
```
As a user,
When calling printStatement I want to see all deposits highlighted in green,
To easily see what I have deposited.

|  Objects        |  Properties             |   Messages           |  Output  |
| --------------- | ----------------------- | ---------------------| -------- |
|  Statement      | statementHeader @String | printStatement()     | @String  |
|                 |                         | statementFormatter() | @String  |

As a user,
When calling printStatement I want to see all withdrawals highlighted in red,
To easily see what I have withdrawn.

|  Objects        |  Properties             |   Messages           |  Output  |
| --------------- | ----------------------- | ---------------------| -------- |
|  Statement      | statementHeader @String | printStatement()     | @String  |
|                 |                         | statementFormatter() | @String  |

```


You may find this link useful [Output to the command line using NodeJS](https://nodejs.dev/en/learn/output-to-the-command-line-using-nodejs/) - check the formatting section (and this links out to a GitHub doc on the [ANSI color codes](https://gist.github.com/iamnewton/8754917))
