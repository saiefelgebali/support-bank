import log4js from "log4js";
import { mainMenu } from "./menu";
import { getCommandLineArguments } from "./userInput";
import { Parser } from "./parser/Parser";
import "./logger";

const logger = log4js.getLogger("<index.ts>");

async function getUserAccounts(path: string) {
	const parser = Parser.getParser(path);
	const { users, transactions } = await parser.parse();

	transactions.forEach((transaction) => {
		users[transaction.from].handleTransaction(transaction);
		users[transaction.to].handleTransaction(transaction);
	});

	return users;
}

async function startBank(filename: string) {
	const users = await getUserAccounts(filename);
	mainMenu(users);
}

function main() {
	logger.log("Starting support bank");
	const [filename] = getCommandLineArguments(1);
	startBank(filename);
}

main();
