import { parseTransactionsCSV } from "./csv";

function collapseTransactions(path: string) {
	const { transactions, users } = parseTransactionsCSV(path);

	transactions.forEach((transaction) => {
		users[transaction.from].handleTransaction(transaction);
		users[transaction.to].handleTransaction(transaction);
	});

	return { transactions, users };
}

function main() {
	collapseTransactions("./examples/Transactions2014.csv");
}

main();
