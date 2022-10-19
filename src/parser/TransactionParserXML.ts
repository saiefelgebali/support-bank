import log4js from "log4js";
import { DateTime } from "luxon";
import { TransactionParser } from "./TransactionParser";
import { Transaction } from "../Transaction";
import { XMLParser } from "fast-xml-parser";

const logger = log4js.getLogger("<TransactionParserXML.ts>");

interface XMLTransaction {
	Description: string;
	Value: number;
	Parties: { From: string; To: string };
	Date: string;
}

export class TransactionParserXML extends TransactionParser {
	constructor(text: string) {
		super(text);
	}

	public override async parseTransactions() {
		logger.log(`Parsing XML file`);

		const parser = new XMLParser({
			ignoreAttributes: false,
			attributeNamePrefix: "",
		});

		const data = parser.parse(this.text);

		return data.TransactionList.SupportTransaction.map(
			this.createTransaction
		);
	}

	// https://github.com/markitondemand/moment-msdate/blob/master/moment-msdate.js
	private fromOADate(oadate: number) {
		var date = new Date((oadate - 25569) * 86400000);
		var tz = date.getTimezoneOffset();
		return new Date((oadate - 25569 + tz / (60 * 24)) * 86400000);
	}

	private createTransaction(data: XMLTransaction): Transaction {
		const date = DateTime.fromJSDate(this.fromOADate(parseInt(data.Date)));

		return new Transaction(
			date,
			data.Parties.From,
			data.Parties.To,
			data.Description,
			data.Value
		);
	}
}
