import { parseTransactionsCSV } from "./csv";
import { mainMenu } from "./menu";
import { getCommandLineArguments } from "./userInput";

function collapseTransactions(path: string) {
	const { users, transactions } = parseTransactionsCSV(path);

	transactions.forEach((transaction) => {
		users[transaction.from].handleTransaction(transaction);
		users[transaction.to].handleTransaction(transaction);
	});

	return users;
}

function main() {
	const [filename] = getCommandLineArguments(1);
	const users = collapseTransactions(filename);
	mainMenu(users);
}

main();
