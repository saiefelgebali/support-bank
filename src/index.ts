import { parseTransactionsCSV, parseUsers } from "./csv";
import { mainMenu } from "./menu";
import { getCommandLineArguments } from "./userInput";
import log4js from "log4js";

log4js.configure({
	appenders: {
		file: { type: "fileSync", filename: "logs/debug.log" },
	},
	categories: {
		default: { appenders: ["file"], level: "debug" },
	},
});

const logger = log4js.getLogger("<index.ts>");

async function collapseTransactions(path: string) {
	const transactions = await parseTransactionsCSV(path);
	const users = parseUsers(transactions);

	transactions.forEach((transaction) => {
		users[transaction.from].handleTransaction(transaction);
		users[transaction.to].handleTransaction(transaction);
	});

	return users;
}

async function startBank(filename: string) {
	const users = await collapseTransactions(filename);
	mainMenu(users);
}

function main() {
	logger.log("Starting support bank");
	const [filename] = getCommandLineArguments(1);
	startBank(filename);
}

main();
