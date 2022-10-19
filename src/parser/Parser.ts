import fs from "fs";
import log4js from "log4js";
import { TransactionParser } from "./TransactionParser";
import { TransactionParserCSV } from "./TransactionParserCSV";
import { TransactionParserJSON } from "./TransactionParserJSON";
import { TransactionParserXML } from "./TransactionParserXML";

const logger = log4js.getLogger("<TransactionParser.ts>");

enum FileType {
	json = "json",
	csv = "csv",
	xml = "xml",
}

export class Parser {
	public static getParser(path: string): TransactionParser {
		const text = this.readText(path);

		switch (this.getFileType(path)) {
			case FileType.json:
				return new TransactionParserJSON(text);
			case FileType.csv:
				return new TransactionParserCSV(text);
			case FileType.xml:
				return new TransactionParserXML(text);
		}
	}

	private static getFileType(path): FileType {
		const parts = path.split(".");
		const extension = parts[parts.length - 1];

		if (!(extension in FileType)) {
			logger.error("Tried to parse an unsupported file");
			throw "Unsupported filetype";
		}

		return FileType[extension];
	}

	private static readText(path: string) {
		logger.log(`Reading file: ${path}`);
		return fs.readFileSync(path).toString();
	}
}
