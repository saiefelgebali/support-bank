import { parseTransactionsCSV } from "./csv";

function collapseTransactions() {
	const { transactions, users } = parseTransactionsCSV(
		"./examples/Transactions2014.csv"
	);

	transactions.forEach((transaction) => {
		users[transaction.from].handleTransaction(transaction);
		users[transaction.to].handleTransaction(transaction);
	});

	console.log(users);
}

collapseTransactions();
