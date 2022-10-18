import { parseTransactionsCSV } from "./csv";
import { listAll, listUserTransactions } from "./list";

function collapseTransactions(path: string) {
	const { users, transactions } = parseTransactionsCSV(path);

	transactions.forEach((transaction) => {
		users[transaction.from].handleTransaction(transaction);
		users[transaction.to].handleTransaction(transaction);
	});

	return { users, transactions };
}

function main() {
	const { users, transactions } = collapseTransactions(
		"./examples/Transactions2014.csv"
	);

	listAll(users);

	listUserTransactions("Sam N", users);
}

main();
