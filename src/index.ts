import { parseTransactionsCSV } from "./csv";
import { mainMenu } from "./menu";

function collapseTransactions(path: string) {
	const { users, transactions } = parseTransactionsCSV(path);

	transactions.forEach((transaction) => {
		users[transaction.from].handleTransaction(transaction);
		users[transaction.to].handleTransaction(transaction);
	});

	return users;
}

function main() {
	const users = collapseTransactions("./examples/Transactions2014.csv");
	mainMenu(users);
}

main();
