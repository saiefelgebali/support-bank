import log4js from "log4js";
import { getCommandLineArguments } from "./userInput";
import { SupportBank } from "./SupportBank";
import "./logger";

const logger = log4js.getLogger("<index.ts>");

async function main() {
	logger.log("Starting support bank");
	const [filename] = getCommandLineArguments(1);
	const bank = new SupportBank();
	await bank.readFromFile(filename);
	bank.start();
}

main();
